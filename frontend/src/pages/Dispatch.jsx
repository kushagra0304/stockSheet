import { useState } from "react"
import * as dispatchService from "../services/dispatch"
import readXlsxFile from 'read-excel-file'
import { useField } from '../hooks/hooks'
import excelReelSchema from "../schemas/excelReelSchema"

const millNames = [
    'Deoria',
    'Devrishi'
]

const Dispatch = () => {
    const [excel, setExcel] = useState(null)
    const [message, setMessage] = useState("");
    const millName = useField("text");
    const billDate = useField("date");
    const billNumber = useField("text");

    const uniqueReelNumbers = (rows) => {
        let set = new Set();
        let bool = true;

        rows.forEach(row => {
            if(set.has(row.reelNo)) {
                bool = false;
            }

            set.add(row.reelNo);
        });

        return bool;
    }

    const handleFileValidationAndConversion = async () => {
        const {rows, errors} = await readXlsxFile(excel, {
            schema: excelReelSchema,  
            ignoreEmptyRows: false
        })

        if(!uniqueReelNumbers(rows)){
            throw new Error("Reel numbers are not unique");
        }

        if(errors.length !== 0) {
            throw errors;
        }

        return rows;
    }

    const handleFieldValidations = () => {
        if(!millName.value) {
            setMessage("Please select a mill name");
            return false;
        }

        if(!excel) {
            setMessage("No file selected!");
            return false;
        }

        if(!billDate.value) {
            setMessage("Set bill date!");
            return false;
        }

        if(!billNumber.value) {
            setMessage("Enter bill Number");
            return false;
        }

        return true;
    }

    const handleFileChange = (event) => {
        setExcel(event.target.files[0]);
    }

    const savePDFLocallyOrDownload = (response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'barcodes.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let rows;

        if(!handleFieldValidations()) {
            return;
        }

        try {
            rows = await handleFileValidationAndConversion();
        } catch(error) {
            console.log(error);
            setMessage("Error reading excel file");
            return;
        }

        try {
            const response = await dispatchService.dispatch({
                millName: millName.value,
                dispatch: rows,
                billDate: billDate.value,
                billNumber: billNumber.value
            });

            if(response.status !== 200) {
                setMessage("Operation not sucessful");
                return;
            } else {
                setMessage("Operation sucessfull");
            }

            savePDFLocallyOrDownload(response)
        } catch(error) {
            console.log(error);
            setMessage("Network error");
            return;
        }
    }

    return (
        <div style={{height: "100vh", position: "relative"}}>
            <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                <p style={{color: "red"}}>{message}</p>
                <div style={{width: "256px"}}>
                    <form onSubmit={handleSubmit}>
                        <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
                            <label>
                                Mill name 
                                <select value={millName.value} onChange={millName.onChange}>
                                    <option value="" disabled selected>Select an option...</option>
                                    {millNames.map((millName) => {
                                        return (
                                            <option key={millName} value={millName}>{millName}</option>
                                        )
                                    })}
                                </select>
                            </label>
                            <label>Bill Number <input {...billNumber}/></label>
                            <label>Bill Date <input {...billDate}/></label>
                            <input accept=".xlsx" name="dispatch" type="file" onChange={handleFileChange}/>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dispatch
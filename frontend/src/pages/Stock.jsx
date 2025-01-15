import { useEffect, useState } from "react";
import * as stockService from "../services/stock"
import Reels from "../components/Reels";
import 'purecss/build/forms.css'
import 'purecss/build/tables.css'
import 'purecss/build/buttons.css'
import '../styles/stockPage.css'
import SelectedReelGroups from "../components/SelectedReelGroups";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearReelGroups } from "../reducers/selectedReelGroupsReducer";

const FilterInput = ({ name, value, setFilter }) => {
    const [checked, setChecked] = useState(false);

    return (
        <>
            <label className="pure-radio">
                <span>{value}: </span>
                <input type="radio" name={name} onClick={(event) => {
                    setChecked(value => !value);
                    event.target.checked = !checked
                    setFilter(name, value)
                }}/>
            </label>
        </>
        
    )
}

const Filter = ({ name, values, setFilter }) => {
    return (
        <fieldset>
            <legend>{name.toUpperCase() }</legend>
            <div style={{ display: 'flex', gap: "12px"}}>
                {values.map((value) => {
                    return <FilterInput name={name} value={value} setFilter={setFilter}/>
                })}
            </div>
        </fieldset>
    )
}

const Stock = () => {
    const [reelGroups, setReelGroups] = useState();
    // I haved defined the object below only for documentation.
    const [filtersValues, setFiltersValues] = useState({ gsm: new Set(), size: new Set(), bf: new Set(), shade: new Set() });
    const [filters, setFilters] = useState({ gsm: '', size: '', bf: '', shade: '' });
    const selectedReelGroups = useSelector(state => state.selectedReelGroups);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFiltersValues = (reelGroups) => {
        const gsmSet = new Set();
        const sizeSet = new Set();
        const bfSet = new Set();
        const shadeSet = new Set();

        reelGroups.forEach(reelGroup => {
            gsmSet.add(reelGroup.gsm);
            sizeSet.add(reelGroup.size);
            bfSet.add(reelGroup.bf);
            shadeSet.add(reelGroup.shade);
        });

        return {
            gsm: gsmSet,
            size: sizeSet,
            bf: bfSet,
            shade: shadeSet
        };
    }

    const handleFilters = (filterName, value) => {
        if(filters[`${filterName}`] === value) {
            filters[`${filterName}`] = '';
        } else {
            filters[`${filterName}`] = value;
        }

        setFilters(structuredClone(filters));
    }

    useEffect(() => {
        dispatch(clearReelGroups());

        stockService.getStockAsReelGroup().then(async (res) => {  
            const reelGroups = res.data;       
            setFiltersValues(handleFiltersValues(reelGroups));
            setReelGroups(reelGroups);
        });
    }, []);

    useEffect(() => {
        console.log(filters);
    }, [filters])

    return (
        <div style={{padding: '12px'}}>
            <form className="pure-form">
                {Object.entries(filtersValues).map(([key, set]) => {
                    return <Filter name={key} values={Array.from(set)} setFilter={handleFilters} />
                })}
            </form>

            <div>
                <h2 style={{ fontSize: '18px' }}>Stock</h2>
                <div style={{ overflowX: 'scroll' }}>
                    <Reels 
                        reelGroups={Object.entries(filters).reduce((filteredReelGroups, [key, value]) => {
                            if(value === ''){
                                return filteredReelGroups;
                            }

                            return filteredReelGroups.filter((reelGroup) => reelGroup[`${key}`] === value);
                    }, reelGroups)}/>
                </div>
            </div>

            <div>
                <h2 style={{ fontSize: '18px' }}>Selected Reels</h2>
                <div style={{ overflowX: 'scroll', backgroundColor: '#e0e0e0' }}>
                    <SelectedReelGroups/>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <button 
                        id="createOrderButton" 
                        className="pure-button" 
                        disabled={selectedReelGroups.length === 0 ? true : false}
                        onClick={() => navigate("/createOrder")}
                    >Create Order</button>
                </div>
            </div>
        </div>
    );
}

export default Stock;
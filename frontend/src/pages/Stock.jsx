import { useEffect, useState } from "react";
import * as stockService from "../services/stock"
import Reels from "../components/Reels";
import { useNavigate } from 'react-router-dom'
import 'purecss/build/forms.css'
import 'purecss/build/tables.css'
import '../styles/stockPage.css'
import SelectedReelGroups from "../components/SelectedReelGroups";

const FilterInput = ({ name, value, setFilter }) => {
    const navigate = useNavigate()
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
    const [stock, setStock] = useState();
    // I haved defined the object below only for documentation.
    const [filtersValues, setFiltersValues] = useState({ gsm: new Set(), size: new Set(), bf: new Set(), shade: new Set() });
    const [filters, setFilters] = useState({ gsm: '', size: '', bf: '', shade: '' });
    const [selectedReelGroups, setSelectedReelGroups] = useState([]);

    const handleFiltersValues = (reels) => {
        const gsmSet = new Set();
        const sizeSet = new Set();
        const bfSet = new Set();
        const shadeSet = new Set();

        reels.forEach(reel => {
            gsmSet.add(reel.gsm);
            sizeSet.add(reel.size);
            bfSet.add(reel.bf);
            shadeSet.add(reel.shade);
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
        stockService.getStock().then((res) => {
            const stock = res.data;
            setFiltersValues(handleFiltersValues(stock));
            setStock(res.data);
        });
    }, []);

    return (
        <div style={{padding: '12px'}}>
            <form className="pure-form">
                {Object.entries(filtersValues).map(([key, set]) => {
                    return <Filter name={key} values={Array.from(set)} setFilter={handleFilters} />
                })}
            </form>

            <div style={{ marginBottom: '18px' }}>
                <h2 style={{ fontSize: '18px' }}>Stock</h2>
                <div style={{ overflowX: 'scroll' }}>
                    <Reels 
                        selectedReelGroups={selectedReelGroups} 
                        setSelectedReelGroups={setSelectedReelGroups} 
                        reels={Object.entries(filters).reduce((filteredReels, [key, value]) => {
                            if(value === ''){
                                return filteredReels;
                            }

                            return filteredReels.filter((reel) => reel[`${key}`] === value);
                    }, stock)}/>
                </div>
            </div>

            <div>
                <h2 style={{ fontSize: '18px' }}>Selected Reels</h2>
                <div style={{ overflowX: 'scroll', backgroundColor: '#e0e0e0' }}>
                    <SelectedReelGroups selectedReelGroups={selectedReelGroups} setSelectedReelGroups={setSelectedReelGroups}/>
                </div>
            </div>
        </div>
    );
}

export default Stock;
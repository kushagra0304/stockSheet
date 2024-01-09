import { useEffect, useState } from "react";
import * as stockService from "../services/stock"

const FilterInput = ({ name, value, setFilter }) => {
    const [checked, setChecked] = useState(false);

    return (
        <label>
            <span>{value}:</span>
            <input type="radio" name={name} onClick={(event) => {
                setChecked(value => !value);
                event.target.checked = !checked
                setFilter(name, value)
            }}/>
            <span> </span>
        </label>
    )
}

const Filter = ({ name, values, setFilter }) => {
    return (
        <fieldset>
            <legend>{name}</legend>
            <div>
                {values.map((value) => {
                    return <FilterInput name={name} value={value} setFilter={setFilter}/>
                })}
            </div>
        </fieldset>
    )
}

const Reels = ({ reels }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Size</th>
                    <th>GSM</th>
                    <th>BF</th>
                    <th>Shade</th>
                </tr>
            </thead>
            <tbody>
                {reels ? reels.map((reel) => {
                    return (
                        <tr>
                            <td>{reel.size}</td>
                            <td>{reel.gsm}</td>
                            <td>{reel.bf}</td>
                            <td>{reel.shade}</td>
                        </tr>
                    )
                }) : <></>}
            </tbody>
        </table>
    )
}

const Stock = () => {
    const [stock, setStock] = useState();
    // I haved defined the object below only for documentation.
    const [filtersValues, setFiltersValues] = useState({ gsm: new Set(), size: new Set(), bf: new Set(), shade: new Set() });
    const [filters, setFilters] = useState({ gsm: '', size: '', bf: '', shade: '' });

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
        <div style={{margin: '12px'}}>
            <div>
                {Object.entries(filtersValues).map(([key, set]) => {
                    return <Filter name={key} values={Array.from(set)} setFilter={handleFilters} />
                })}
            </div>

            <div>
                <Reels reels={Object.entries(filters).reduce((filteredReels, [key, value]) => {
                    if(value === ''){
                        return filteredReels;
                    }

                    return filteredReels.filter((reel) => reel[`${key}`] === value);
                }, stock)}/>
            </div>
        </div>
    );
}

export default Stock;
import { useEffect, useState } from "react";
import { carModelApi } from "../../api/carModel.api";

export default function CarModelList() {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");

    useEffect(() => {
        const loadModels = async () => {
            const res = await carModelApi.list({ search, sortBy : sort });
            setList(res.data.data);
        };
        loadModels();
    }, [search, sort]);

    return (
        <div>
            <input placeholder="Search Name or Code..." value={search} onChange={(e) => setSearch(e.target.value)} />

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="sortOrder">Sort Order</option>
                <option value="manufacturingDate">Date of Manufacturing</option>
            </select>

            <div style={{ marginTop: 20 }}>
                {list?.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: 12, padding: 12 }}>
                        <img src={item.defaultImage} width={80} height={60} style={{ objectFit: "cover", borderRadius: 4 }} />

                        <div>
                            <div>
                                <b>{item.modelName}</b>
                            </div>
                            <div>Brand: {item.brand}</div>
                            <div>Class: {item.class}</div>
                            <div>Code: {item.modelCode}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

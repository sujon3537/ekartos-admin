import React from "react";
import { useRouter } from "next/navigation";
import Options from "../Table/Options";

const TreeLine = ({ data, level, active, setActive, type }) => {
  const router = useRouter();

  if (!data) return null;
  return (
    <ul>
      {data.map((item, i) => {
        return <li key={i} className={item.subcategories.length ? "inside-ul" : ""} style={{ color: router?.query?.updateId == item.id ? "#0da487" : "" }}>
          <div className={`${item.status == 0 ? "disabled" : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (item.subcategories) {
                let temp = active;
                active.includes(item.id) ? temp.splice(active.indexOf(item.id), 1) : (temp = [...active, item.id]);
                setActive([...temp]);
              }
            }}>
            <i className="tree-icon file-icon" role="presentation"></i>
            {item.name}
            <div className="tree-options">
              <Options fullObj={item} type={type} keyInPermission={"category"} />
            </div>
          </div>
          {item.subcategories && (
            <div className={active.includes(item.id) ? "d-block" : "d-none"}>
              <TreeLine data={item.subcategories} level={level + 1} active={active} setActive={setActive} type={type} />
            </div>
          )}
        </li>
      })
      }
    </ul >
  );
};

export default TreeLine;

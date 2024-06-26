/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Styles from "./scouts.module.scss";
import { fetchData } from "../../../utils/utils";

const Record = ({ name, status, company, role, id }) => {
  const deleteScout = async (_id) => {
    const res = await fetchData("PATCH", `admin/deactivate-scout/${_id}`);
    if (res.status === 201) {
      window.location.reload();
    }
  };

  const activateScout = async (_id) => {
    console.log(_id);
    const res = await fetchData("PATCH", `admin/activate-scout/${_id}`);
    if (res.status === 201) {
      window.location.reload();
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td className={Styles.status_box}>
        <span
          className={`${Styles.status} ${
            status === "Inactive" ? Styles.inactive : null
          } `}
        >
          {status}
        </span>{" "}
      </td>
      <td>{company}</td>
      <td>{role}</td>
      <td>
        {status === "Active" ? (
          <svg
            width="17"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={Styles.delete}
            onClick={() => {
              deleteScout(id);
            }}
          >
            <path
              d="M19.2857 4.14284H15.608L14.0902 1.60936C13.6652 0.965474 13.0089 0.571411 12.2589 0.571411H7.74107C6.99107 0.571411 6.29464 0.965474 5.91071 1.60936L4.39196 4.14284H0.714286C0.31808 4.14284 0 4.46114 0 4.85713V5.57141C0 5.96873 0.31808 6.2857 0.714286 6.2857H1.42857V20.5714C1.42857 22.1495 2.70759 23.4286 4.28571 23.4286H15.7143C17.2924 23.4286 18.5714 22.1495 18.5714 20.5714V6.2857H19.2857C19.683 6.2857 20 5.96873 20 5.57141V4.85713C20 4.46114 19.683 4.14284 19.2857 4.14284ZM7.67411 2.84284C7.71875 2.76471 7.80804 2.71427 7.90179 2.71427H12.0982C12.1931 2.71427 12.2824 2.76449 12.327 2.84262L13.1071 4.14284H6.89286L7.67411 2.84284ZM15.7143 21.2857H4.28571C3.89121 21.2857 3.57143 20.9659 3.57143 20.5714V6.2857H16.4286V20.5714C16.4286 20.9643 16.1071 21.2857 15.7143 21.2857ZM10 19.1428C10.3948 19.1428 10.7143 18.8234 10.7143 18.4286V9.14284C10.7143 8.74802 10.3948 8.42855 10 8.42855C9.60518 8.42855 9.28571 8.74998 9.28571 9.14284V18.4286C9.28571 18.8214 9.60714 19.1428 10 19.1428ZM6.42857 19.1428C6.82143 19.1428 7.14286 18.8214 7.14286 18.4286V9.14284C7.14286 8.74802 6.82339 8.42855 6.42857 8.42855C6.03375 8.42855 5.71429 8.74998 5.71429 9.14284V18.4286C5.71429 18.8214 6.03571 19.1428 6.42857 19.1428ZM13.5714 19.1428C13.9663 19.1428 14.2857 18.8234 14.2857 18.4286V9.14284C14.2857 8.74802 13.9663 8.42855 13.5714 8.42855C13.1766 8.42855 12.8571 8.74998 12.8571 9.14284V18.4286C12.8571 18.8214 13.1786 19.1428 13.5714 19.1428Z"
              fill="#FF0000"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0,0,256,256"
            className={Styles.activate}
            onClick={() => {
              activateScout(id);
            }}
          >
            <g
              fill="#23d725"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              // style="mix-blend-mode: normal"
            >
              <g transform="scale(10.66667,10.66667)">
                <path d="M20.29297,5.29297l-11.29297,11.29297l-4.29297,-4.29297l-1.41406,1.41406l5.70703,5.70703l12.70703,-12.70703z"></path>
              </g>
            </g>
          </svg>
        )}
      </td>
    </tr>
  );
};

const Scouts = () => {
  const [scouts, setScouts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchData("GET", "admin/get-scouts");
      setScouts(data.data.scouts);
    })();
  }, []);

  const record = scouts
    ? scouts.map((sc) => (
        <Record
          name={sc.name}
          key={sc._id}
          id={sc._id}
          company={sc.company}
          role={sc.role}
          status={sc.status}
        />
      ))
    : null;

  return (
    <table className={Styles.table} cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Company</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* <Record
          status="Active"
          role="ui/ux designer"
          company="microsoft"
          name="God man"
        /> */}
        {record}
      </tbody>
    </table>
  );
};

export default Scouts;

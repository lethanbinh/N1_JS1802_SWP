import './StaffList.css';
import NavBar from './NavBar';
import SideBar from './SideBar';


const projects = [
  { id: 1, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 57, status: "Success" },
  { id: 2, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 47, status: "Success" },
  { id: 3, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 77, status: "Success" },
  { id: 4, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 60, status: "Success" },
  { id: 5, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 12, status: "Success" },
  { id: 6, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 35, status: "Success" },
  { id: 7, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 87, status: "Success" },
  { id: 8, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 77, status: "Success" },
  { id: 9, name: "AdminLTE v3", date: "01.01.2019", members: ["A", "B", "C"], progress: 77, status: "Success" },
];

const StaffList = () => {
  return (
    <div className="container">
      <SideBar/>
      <NavBar />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Project Name</th>

            <th>Project Progress</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>

              <td>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${project.progress}%` }}
                    aria-valuenow={project.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {project.progress}% Complete
                  </div>
                </div>
              </td>
              <td>{project.status}</td>
              <div className="button">
                <td>
                  <button className="btn btn-primary">Create</button>
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </div>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
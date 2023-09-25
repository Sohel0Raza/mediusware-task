import React, { useState } from 'react';
import useLocalStorage from 'use-local-storage';

const Problem1 = () => {
    const TaskStatusEnum = {
        ALL: 'all',
        ACTIVE: 'active',
        COMPLETED: 'completed',
    };

    const [tasks, setTasks] = useLocalStorage("allTask");
    const [showTasks, setShowTasks] = useState(tasks);
    const [show, setShow] = useState(TaskStatusEnum.ALL);


    const handleClick = (status) => {
        setShow(status);
        const filteredTasks = status === TaskStatusEnum.ALL ? tasks : tasks.filter(task => task.status === status);
        setShowTasks(filteredTasks);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const status = form.status.value
        const task = { id: new Date().getTime().toString(), name, status }
        let allTask = JSON.parse(localStorage.getItem('allTask')) || [];
        allTask.push(task);
        localStorage.setItem('allTask', JSON.stringify(allTask));
        setTasks(allTask);
        window.location.reload();
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleFormSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" name='name' className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input type="text" name='status' className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick(TaskStatusEnum.ALL)}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick(TaskStatusEnum.ACTIVE)}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick(TaskStatusEnum.COMPLETED)}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showTasks?.map(task => <tr
                                key={task.id}>
                                <td>{task.name}</td>
                                <td>{task.status}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
import React from 'react'
import './TrainerDashboard.css'
import TrainerDashboardComponent from '../../components/Trainer/TrainerDashboard';
const TrainerDashboard = () => {
  const columns = [
    "User Name	",
    "Date",
    "Age",
    "Phone No.",
    "Gender",
    "Goal",
    "Assign Trainer",
    "Status",
    "Action",
  ];
  return (
    <TrainerDashboardComponent />

  )
}

export default TrainerDashboard
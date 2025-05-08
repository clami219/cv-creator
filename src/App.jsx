import { useState } from 'react'
import GeneralInformation from './components/GeneralInformation'
import EducationalExperiences from './components/EducationalExperiences'
import WorkExperiences from './components/WorkExperiences'
import './styles/App.css'

function App() {

  return (
    <>
      <div className="flex items-center justify-center min-h-10">
        <h1 className="text-5xl md:text-7xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg">Curriculum builder</h1>
      </div>
      <GeneralInformation></GeneralInformation>
      <EducationalExperiences></EducationalExperiences>
      <WorkExperiences></WorkExperiences>
    </>
  )
}

export default App

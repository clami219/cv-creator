import { useState } from 'react'
import GeneralInformation from './components/GeneralInformation'
import EducationalExperiences from './components/EducationalExperiences'
import WorkExperiences from './components/WorkExperiences'
import './styles/App.css'

function App() {

  return (
    <>
      <div className="flex items-center justify-center min-h-10 print:hidden">
        <h1 className="text-5xl md:text-7xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-l">Curriculum generator</h1>
      </div>
      <p className="p-6 print:hidden">Fill up the following form to create your CV and then <a onClick={()=>window.print()} className="cursor-pointer !text-purple-500">print</a> this page to export it as a PDF</p>
      <GeneralInformation></GeneralInformation>
      <EducationalExperiences></EducationalExperiences>
      <WorkExperiences></WorkExperiences>
    </>
  )
}

export default App

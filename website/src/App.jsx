import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import CreateAcc from './pages/CreateAcc'
import StudentPortal from './pages/StudentPortal'
import TeacherPortal from './pages/TeacherPortal'
import AdminPortal from './pages/AdminPortal'
import CodeEditor from './pages/CodeEditor'
import GenerateQuestion from './pages/GenerateQuestion'
import VideoCon from './pages/VideoCon'
import QuestionForm from './pages/QuestionForm'
// import CreateForm from './pages/CreateForm'
// import ViewFeedback from './pages/ViewFeedback'
// import ExamScheduler from './pages/ExamScheduler'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
              {/* <Route path='/' element={<Login/>}/> */}
              {/* <Route path='/create-account' element={<CreateAcc/>}/> */}
              {/* <Route path='/login' element={<Login/>}/> */}
              <Route path='/' element={<StudentPortal/>}/>
              <Route path='/teacher' element={<TeacherPortal/>}/>
              <Route path='/admin' element={<AdminPortal/>}/>
              <Route path='/code_editor' element={<CodeEditor/>}/>
              <Route path='/generate_question' element={<GenerateQuestion/>}/>
              <Route path='/video_con' element={<VideoCon/>}/>
              <Route path='/question_form' element={<QuestionForm/>}/>
              {/* <Route path='/create_form' element={<CreateForm/>}/>
              <Route path='/view_feedback' element={<ViewFeedback/>}/>
              <Route path='/exam_scheduler' element={<ExamScheduler/>}/>  */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

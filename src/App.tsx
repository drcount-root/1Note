import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route, Navigate} from 'react-router-dom';

const App = () => {
  return <Routes>
    <Route path="/" element={<h1>Home</h1>}/>
    <Route path="/new" element={<h1>New</h1>}/>

    {/* id could be a num or letter. url ex- localhost:5173/a or localhost:5173/1 etc.*/}
    <Route path="/:id">
      {/* using index so that at localhost:5173/1 url, it will view/show Show page*/}
      <Route index element={<h1>Show</h1>}/>
      {/* at localhost:5173/1/edit url, it will show Edit page*/}
      <Route path="edit" element={<h1>Edit</h1>}/>
    </Route>


    {/* if path provided by user doesn't matches with any of the defined paths, then it navigates/redirects the user to the homepage */}
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>;
}

export default App;

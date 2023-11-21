

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./assets/fontawesome/css/font-awesome.min.css";
import './App.css';
import { UserProvider } from './store/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminMiddleware from './utils/AdminMiddleware';
import PrivateRouting from "./navigation/PrivateRouting";
import {DashboardPage} from "./pages/DashboardPage";
import {SystemErrorBlock} from "./components/SystemErrorBlock";
import {SystemLoadingBlock} from "./components/SystemLoadingBlock";
import { Component } from 'react';
import { LoginPage } from "./pages/LoginPage";
import constant from "./utils/GlobalVariables";
import { AdminProfilePage } from "./pages/AdminProfilePage";
import { UsersPage } from "./pages/UsersPage";
import StatementsPage from "./pages/StatementsPage";
import StatementPage from "./pages/StatementPage";


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLaunched : false,
      isError : false,
      user : {
        isAuthed : false
      },
    }
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  async componentDidMount(){
    await this.checkAuthStatus();
  }

  async checkAuthStatus(){
    this.setState({isLaunched: false, isError : false});
    const adminMiddleware = new AdminMiddleware();
    const jwt = adminMiddleware.getJWTFromCookie();
    if(jwt === null){
      this.setState({isLaunched: true, isError : false});
      return;
    }
    
    this.setState({isLaunched: false, isError : false});

    
    fetch(constant.baseDomain + "/api/admin", 
      {
        method : "GET",
        headers : {
          "Authorization" : "Bearer " + jwt,
        }
      }
    )
    .then((response) => {
        console.log("response.status: " + response.status);
        if(response.status === 401 || response.status === 403)
        {
          this.setState({isLaunched: true, isError : false});
        }
        return response.json();
    })
    .then((jsonAnswerStatus) => {
          if(typeof(jsonAnswerStatus.status) !== "undefined" && jsonAnswerStatus.status !== null && jsonAnswerStatus.status === "success")
          {
            this.setState({
              isLaunched: true, 
              isError : false, 
              user : {isAuthed: true},
            });
            
          } else 
          {
            this.setState({isLaunched: true, isError : false});
          }
        },
        (error) => {
          console.log(error);
          this.setState({isLaunched: true, isError : true});
        }
    );
    
    
  }
  
  render()
  {

    if(!this.state.isLaunched)
    {
      return (
        <SystemLoadingBlock />
      )
    }
    if(this.state.isError)
    {
      return (
        <SystemErrorBlock tryAgain={() => this.checkAuthStatus()} />
      )
    }

    return (
      <UserProvider valueUser={this.state.user}>
        <BrowserRouter>
          <Routes>
              <Route path = "/" element={<PrivateRouting/>}>
                <Route path ="/" exact element={<DashboardPage/>}></Route>
                <Route path ="/profile" exact element={<AdminProfilePage/>}></Route>
                <Route path ="/users" exact element={<UsersPage/>}></Route>
                <Route path ="/statements" exact element={<StatementsPage/>}></Route>
                
                <Route path ="/statement/:statement_id" exact element={<StatementPage/>}></Route>

              </Route>

              <Route path="/login" exact element={<LoginPage/>} />
              

          </Routes>
        </BrowserRouter>
      </UserProvider>
    );
  }
}


import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import './css.css'
import {sha256} from 'crypto-hash';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
var user = ""
const venuelocation = [
  {Venuename: "Hong Kong Film Archive (Cinema)", 
  latitude: 22.285056,
  longitude: 114.222075,
  venueid: 75010017, 
  Eventnum : 19,
  Event: {
    id: 145054,
    title: "Lecture Series - Genius of the System: When Art and Commerce Converge on Film (Film Screening)",
    date: "5 January 2023 (Thu) 7:45pm",
    time: "102 minutes",
    price: "$50",
    describtion: "Screening - Beauty Raised from the Dead Union Film is an illustrative example of the genius that is the Hong Kong system. The company was started by a group of established filmmakers who, worried about the blatant commercialization of Hong Kong cinema, banded together to make films of better quality. It revolutionized the industry and became one of the most important film companies of all time. And such genius is the system that the profit-oriented industry would have enough room to allow for these idealists to rewrite history. The titled belle of Beauty Raised from the Dead is played by Pak Yin, a major 1950s star and one of Union’s founders. An accomplished actress who played the hapless but gritty woman in countless films, she had a sensuous side exceptional for her times, her nasal voice adding a touch of subtle sexiness to her otherwise stoic persona. Her scene washing her feet in the rain in Beauty is one of the most sensuous moments in Hong Kong film history. The story is based on the Ming Dynasty classic Peony Pavilion but transplanted to Republic times by renowned director Lee Sun-fung, who tells it with poetic elegance, striking a balance between drama and mood, tradition and modernity. No wonder award-winning director Tsai Ming-Liang considers this one of his favorite films. Post-screening talk in Cantonese by Kenny Ng and Sam Ho",
    presenter: "Presented by Leisure and Cultural Services Department"
  }
  },

  {Venuename: "Sheung Wan Civic Centre (Theatre)", 
  latitude: 22.28602,
  longitude: 114.14967,
  venueid: 87810042,
  Eventnum: 5,
  Event: {
    id: 145054,
    title: "Lecture Series - Genius of the System: When Art and Commerce Converge on Film (Film Screening)",
    date: "5 January 2023 (Thu) 7:45pm",
    time: "102 minutes",
    price: "$50",
    describtion: "Screening - Beauty Raised from the Dead Union Film is an illustrative example of the genius that is the Hong Kong system. The company was started by a group of established filmmakers who, worried about the blatant commercialization of Hong Kong cinema, banded together to make films of better quality. It revolutionized the industry and became one of the most important film companies of all time. And such genius is the system that the profit-oriented industry would have enough room to allow for these idealists to rewrite history. The titled belle of Beauty Raised from the Dead is played by Pak Yin, a major 1950s star and one of Union’s founders. An accomplished actress who played the hapless but gritty woman in countless films, she had a sensuous side exceptional for her times, her nasal voice adding a touch of subtle sexiness to her otherwise stoic persona. Her scene washing her feet in the rain in Beauty is one of the most sensuous moments in Hong Kong film history. The story is based on the Ming Dynasty classic Peony Pavilion but transplanted to Republic times by renowned director Lee Sun-fung, who tells it with poetic elegance, striking a balance between drama and mood, tradition and modernity. No wonder award-winning director Tsai Ming-Liang considers this one of his favorite films. Post-screening talk in Cantonese by Kenny Ng and Sam Ho",
    presenter: "Presented by Leisure and Cultural Services Department"
  }
  },

  {Venuename: "Tsuen Wan Town Hall (Cultural Activities Hall)", 
  latitude: 22.37109,
  longitude: 114.11277,
  venueid: 87210046,
  Eventnum: 21,
  Event: {
    id: 145054,
    title: "Lecture Series - Genius of the System: When Art and Commerce Converge on Film (Film Screening)",
    date: "5 January 2023 (Thu) 7:45pm",
    time: "102 minutes",
    price: "$50",
    describtion: "Screening - Beauty Raised from the Dead Union Film is an illustrative example of the genius that is the Hong Kong system. The company was started by a group of established filmmakers who, worried about the blatant commercialization of Hong Kong cinema, banded together to make films of better quality. It revolutionized the industry and became one of the most important film companies of all time. And such genius is the system that the profit-oriented industry would have enough room to allow for these idealists to rewrite history. The titled belle of Beauty Raised from the Dead is played by Pak Yin, a major 1950s star and one of Union’s founders. An accomplished actress who played the hapless but gritty woman in countless films, she had a sensuous side exceptional for her times, her nasal voice adding a touch of subtle sexiness to her otherwise stoic persona. Her scene washing her feet in the rain in Beauty is one of the most sensuous moments in Hong Kong film history. The story is based on the Ming Dynasty classic Peony Pavilion but transplanted to Republic times by renowned director Lee Sun-fung, who tells it with poetic elegance, striking a balance between drama and mood, tradition and modernity. No wonder award-winning director Tsai Ming-Liang considers this one of his favorite films. Post-screening talk in Cantonese by Kenny Ng and Sam Ho",
    presenter: "Presented by Leisure and Cultural Services Department"
  }
}
];

var locationdata ;


const favlist = JSON.parse(localStorage.getItem('favourite')) || []
      const containerStyle = {
        width: '100%',
        height: '400px'
      };
      
      const center = {
        lat: 22.302711,
        lng: 114.177216
      };

      function updateLocalStorage() {
        //store the list back to localStorage
        localStorage.setItem('favourite', JSON.stringify(favlist))
      }
///////////////////////////////////////////////////////////

class UserPage extends React.Component{
  render(){
    user = this.props.username
    console.log(this.props.username)
    return(
      <>
        <BrowserRouter>
          <div className='container' >
            <div className='row' >
              <div className='col-2' id = "sidebar">
                <div id='Welcome'>
                  <h2>Welcome!</h2>
                  <h4>{this.props.username}</h4>
                </div>
                <ul className='list-group'> 
                  <li className='list-group-item list-group-item-primary'>
                    <Link to="/">Home</Link>{' '}
                  </li>
                  <li className='list-group-item list-group-item-primary'>
                    <Link to="/fav" >Favourite</Link>{' '}
                  </li>
                </ul>
              </div>
              <div className='col-10'>
              
              
              <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/fav" element={<Favourite />} />
                <Route path="/loc/:venuename" element={<Locationpage name={this.props.name}/>} />
                <Route path="*" element={<NoMatch />} />
                
              </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
        
      </>
    )
  }
}


class AdminPage extends React.Component{
  render(){
    console.log(this.props.username)
    return(
      <>
        <BrowserRouter>
        <div className='container'>
          <div className='row'>
          <div className='col-2' id = "sidebar">
            <div id='Welcome'>
            <h2>Welcome!</h2>
            <h4>{this.props.username}</h4>
            </div>
            <ul className='list-group'>
              <li className='list-group-item list-group-item-primary'>
                <Link to="/">Home</Link>{' '}
              </li>
              <li className='list-group-item list-group-item-primary'>
                Event
                <ul>
                  <li className='list-group-item list-group-item-info'>
                    <Link to ="/event/create" >Create</Link>
                  </li>
                  <li className='list-group-item list-group-item-info'>
                    <Link to ="/event/update">Update</Link>
                  </li>
                  <li className='list-group-item list-group-item-info'>
                    <Link to ="/event/delete">Delete</Link>
                  </li>
                </ul>
              </li>
              <li className='list-group-item list-group-item-primary'>
                User
                <ul>
                  <li className='list-group-item list-group-item-info'>
                    <Link to ="/user/create">Create</Link>
                  </li>
                  <li className='list-group-item list-group-item-info'>
                    <Link to ="/user/update">Update</Link>
                  </li>
                  <li className='list-group-item list-group-item-info'>
                    <Link to ="/user/delete">Delete</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className='col-10'>
          
          
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/create" element={<AdminEventCreate />} />
          <Route path="/event/update" element={<AdminEventUpdate />} />
          <Route path="/event/delete" element={<AdminEventDelete />} />
          <Route path="/user/create" element={<AdminUserCreate />} />
          <Route path="/user/update" element={<AdminUserUpdate />} />
          <Route path="/user/delete" element={<AdminUserDelete />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        </div>
          </div>
        </div>
        </BrowserRouter>
        
      </>
    )
  }
}
class Home extends React.Component{
  render(){
    return(
      <>
      <Tools title ={"Home"}/>
      <h3>Welcome to the homepage</h3>
      <h3>You can select the side bar function to create,update and delete data</h3>
      </>
    )
  }
}

class AdminEventCreate extends React.Component{
  constructor(props){
    super(props)
    

    this.state={str:"",title:"", venue :"",date: "", duration:"",agelimit:"",price:"",presenter:"",presenterorg:"",url:"",remark:"",enquiry:"",saledate:"",describle:""}
  }
    
  
  handlesubmit=(e)=>{
    e.preventDefault();
    fetch('http://localhost:3001/event/create',{
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        title: this.state.title,
        venue: this.state.venue,
        date: this.state.date,
        duration: this.state.duration,
        agelimit: this.state.agelimit,
        price: this.state.price,
        presenter: this.state.presenter,
        presenterorg: this.state.presenterorg,
        url: this.state.url,
        remark: this.state.remark,
        enquiry: this.state.enquiry,
        saledate: this.state.saledate,
        describle: this.state.describle,
      })
    })
    .then(response=> response.json())
    .then(response => {
      if(response.success){
        this.setState({str:<h3>The event created successfully</h3>})
      }
      else{
        this.setState({str:<h3>The event failed to create, please check the VenId</h3>})
      }

    })
  }
  handle1=(e)=>{this.setState({title:e.target.value})}
  handle2=(e)=>{this.setState({venue:e.target.value})}
  handle3=(e)=>{this.setState({date:e.target.value})}
  handle4=(e)=>{this.setState({duration:e.target.value})}
  handle5=(e)=>{this.setState({agelimit:e.target.value})}
  handle6=(e)=>{this.setState({price:e.target.value})}
  handle7=(e)=>{this.setState({presenterorg:e.target.value})}
  handle8=(e)=>{this.setState({presenter:e.target.value})}
  handle9=(e)=>{this.setState({remark:e.target.value})}
  handle10=(e)=>{this.setState({enquiry:e.target.value})}
  handle11=(e)=>{this.setState({saledate:e.target.value})}
  handle12=(e)=>{this.setState({url:e.target.value})}
  handle13=(e)=>{this.setState({describle:e.target.value})}
  verify=(e)=>{
    fetch('http://localhost:3001/event/create',{
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({locid: this.state.venue})})
    .then(response=>response.json())
    .then(response=>{
      if(response.name){
        this.setState({venid:response._id})
        alert("Venue is "+response.name)
        console.log(this.state.venid)
      }
      else{
        alert("Can't find Venue")
      }
    })  
  }
  render(){
    return(
      <>
      <Tools title ={"Create Event"}/>
        <form method='POST' onSubmit={this.handlesubmit}>
            <div className='form'>
            <label>Title: </label>
            <input type = "text" required onChange={this.handle1}></input>
            <label>VenueId: </label>
            <input type = "text" required onChange={this.handle2}></input><button type= "button" id="special" className='button-15' onClick={this.verify}>Verify</button><br/>
            <label>Date: </label>
            <input type = "datetime-local" required onChange={this.handle3}></input>
            <label>Duration: </label>
            <input type = "text" onChange={this.handle4}></input ><br/>
            <label>Age Limit: </label>
            <input type = "text" onChange={this.handle5}></input>
            <label>Price: </label>
            <input type = "text" onChange={this.handle6}></input><br/>
            <label>Presenter Org.: </label>
            <input type = "text" onChange={this.handle7}></input>
            <label>Presenter: </label>
            <input type = "text" onChange={this.handle8}></input><br/>
            <label>Remark: </label>
            <input type = "text" onChange={this.handle9}></input>
            <label>Enquiry: </label>
            <input type = "text" onChange={this.handle10}></input><br/>
            <label>Sale Date: </label>
            <input type = "date" onChange={this.handle11}></input>
            <label>URL: </label>
            <input type = "text" onChange={this.handle12}></input><br/>  
            <label id ="area" >Describle: </label>
            <textarea type = "textarea" onChange={this.handle13}></textarea><br/>
            <button className='button-15'>Create</button>
            <button className='button-15' type='reset'>New +</button><br/><br/>
          </div>
        </form>
        <>{this.state.str}</>
      </>
    )
  }
}
class AdminEventUpdate extends React.Component{
  constructor(props){
    super(props)
    this.state={searchvalue:"",eventId:"",str2:"", str :"",title:"", venue :"",date: "", duration:"",agelimit:"",price:"",presenter:"",presenterorg:"",url:"",remark:"",enquiry:"",saledate:"",describle:""}
  }
  handlechangevalue=(e)=>{this.setState({searchvalue:e.target.value})}
  handle1=(e)=>{this.setState({title:e.target.value})}
  handle2=(e)=>{this.setState({venue:e.target.value})}
  handle3=(e)=>{this.setState({date:e.target.value})}
  handle4=(e)=>{this.setState({duration:e.target.value})}
  handle5=(e)=>{this.setState({agelimit:e.target.value})}
  handle6=(e)=>{this.setState({price:e.target.value})}
  handle7=(e)=>{this.setState({presenterorg:e.target.value})}
  handle8=(e)=>{this.setState({presenter:e.target.value})}
  handle9=(e)=>{this.setState({remark:e.target.value})}
  handle10=(e)=>{this.setState({enquiry:e.target.value})}
  handle11=(e)=>{this.setState({saledate:e.target.value})}
  handle12=(e)=>{this.setState({url:e.target.value})}
  handle13=(e)=>{this.setState({describle:e.target.value})}
  handleclick=(e)=>{
    fetch('http://localhost:3001/event/update',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventId : this.state.searchvalue
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success===false){
        this.setState({str:<h3>Can't find the Event, please check the eventId</h3>})
      }
      else{
        this.setState({
          str:"",
          eventId: response.eventId,
          title: response.title,
          venue: response.venId.venId,
          date : response.date,
          duration: response.duration,
          agelimit: response.agelimit,
          price: response.price,
          describle: response.desc,
          url: response.url,
          remark: response.remark,
          enquiry: response.enquiry,
          saledate: response.saledate,
          presenterorg:response.presenterOrg,
          presenter:response.presenter
        })
      }
    })
  }
  handlesubmit = (e)=>{

    fetch('http://localhost:3001/event/update',{
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventId : this.state.eventId,
        title: this.state.title,
        venue: this.state.venue,
        date: this.state.date,
        duration: this.state.duration,
        agelimit: this.state.agelimit,
        price: this.state.price,
        presenter: this.state.presenter,
        presenterorg: this.state.presenterorg,
        url: this.state.url,
        remark: this.state.remark,
        enquiry: this.state.enquiry,
        saledate: this.state.saledate,
        describle: this.state.describle
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success===true)
      this.setState({str2:<h3>Event updated successfully</h3>})
      else
      this.setState({str2:<h3>Event failed to update, please check the VenId</h3>})
    })
  }
  verify=(e)=>{
    fetch('http://localhost:3001/event/create',{
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({locid: this.state.venue})})
    .then(response=>response.json())
    .then(response=>{
      if(response.name){
        this.setState({venid:response._id})
        alert("Venue is "+response.name)
        console.log(this.state.venid)
      }
      else{
        alert("Can't find Venue")
      }
    })  
  }
  render(){
    return(
      <>
      <Tools title ={"Update Event"}/>
      <Searchbar value={this.state.searchvalue} onClickValue={this.handleclick} onChangeValue={this.handlechangevalue} hint={"EventId"}/>
      <>{this.state.str}</>
      <form  method="POST" >
            <div className='form'>
            <label>Title: </label>
            <input type = "text" required onChange={this.handle1} value={this.state.title}></input>
            <label>VenueId: </label>
            <input type = "text" required onChange={this.handle2} value={this.state.venue}></input><button type= "button" id="special" className='button-15' onClick={this.verify}>Verify</button><br/>
            <label>Date: </label>
            <input type = "text" required onChange={this.handle3} value={this.state.date}></input>
            <label>Duration: </label>
            <input type = "text" onChange={this.handle4} value={this.state.duration}></input ><br/>
            <label>Age Limit: </label>
            <input type = "text" onChange={this.handle5} value={this.state.agelimit}></input>
            <label>Price: </label>
            <input type = "text" onChange={this.handle6} value={this.state.price}></input><br/>
            <label>Presenter Org.: </label>
            <input type = "text" onChange={this.handle7} value={this.state.presenterorg}></input>
            <label>Presenter: </label>
            <input type = "text" onChange={this.handle8} value={this.state.presenter}></input><br/>
            <label>Remark: </label>
            <input type = "text" onChange={this.handle9} value={this.state.remark}></input>
            <label>Enquiry: </label>
            <input type = "text" onChange={this.handle10} value={this.state.enquiry}></input><br/>
            <label>Sale Date: </label>
            <input type = "text" onChange={this.handle11} value={this.state.saledate}></input>
            <label>URL: </label>
            <input type = "text" onChange={this.handle12} value={this.state.url}></input><br/>  
            <label id ="area" >Describle: </label>
            <textarea type = "textarea" onChange={this.handle13} value={this.state.describle}></textarea><br/>
            <button className='button-15' type='button' onClick={this.handlesubmit}>Update</button><br/>
          </div>
        </form>
        <>{this.state.str2}</>
      </>
    )
  }
}
class AdminEventDelete extends React.Component{
  constructor(props){
    super(props)
    this.state={searchvalue:"", str :""}
  }
  handlechangevalue=(e)=>{this.setState({searchvalue:e.target.value})}
  handleclick=(e)=>{
    fetch('http://localhost:3001/event/delete',{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventId : this.state.searchvalue
      })
    })
    .then(response=> response.json())
    .then(response =>{
      if(response.success)
        this.setState({str:<h3>The event is deleted</h3>})
      else
        this.setState({str:<h3>Can't match find the event</h3>})
    })
  }
  render(){
    return(
      <>
        <Tools title ={"Delete Event"}/>
        <Searchbar value={this.state.searchvalue} onClickValue={this.handleclick} onChangeValue={this.handlechangevalue} hint={"EventId"}/>
        <p>{this.state.str}</p>
      </>
    )
  }
}
/*
class AdminEditUser extends React.Component{
  constructor(props){
    super(props)
    this.state={searchvalue:"", str :""}
  }
  
  handlechangevalue=(e)=>{this.setState({searchvalue:e.target.value})}
  handleclick=(e)=>{
    fetch('http://localhost:3001/user',{
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({username: this.state.searchvalue})
    })
    .then(response=> response.json())
    .then(response => {console.log(response.username)
      if(response.username)
      {
        this.setState({str:
        <>
          <h3>UserName: {response.username}</h3>
          <h3>Password: {response.password}</h3>
          <h3>Admin: {response.admin.toString()}</h3>
        </>})
      }
      else{
        this.setState({str:<h3>Can't find the user</h3>})
      }
    })
  }
  render(){
    return(
      <>
        <Tools title ={"Search User"}/>
        <Searchbar value={this.state.searchvalue} onClickValue={this.handleclick} onChangeValue={this.handlechangevalue} hint={"UserName"}/>
        <p>{this.state.str}</p>
      </>
    )
  }
}*/
class AdminUserCreate extends React.Component{
  constructor(props){
    super(props)
    this.state={CreateUser:"",unhashedpwd:"", CreatePassword :"",CreateAdmin: false, str:"" ,errmsg1:"",errmsg2:""}
  }
  handleusername=(e)=>{
    this.setState({CreateUser:e.target.value})
  }
  handlepassword=(e)=>{
    this.setState({unhashedpwd:e.target.value})
    sha256(e.target.value)
    .then(response=>{
    this.setState({CreatePassword:response})
    })
  
  }
  handleadmin = (e)=>{
    this.setState({CreateAdmin:e.target.checked})
  }
  submit = (e) =>{
    e.preventDefault();
    switch (this.state.CreateUser.length>=4&&this.state.CreateUser.length<=20) {
      case false:
        {
          this.setState({errmsg1:<div className='invalidfeedback'>The length of username should be between 4 and 20!<br/></div>})
          
          if(this.state.unhashedpwd.length>=4&&this.state.unhashedpwd.length<=20)
          this.setState({errmsg2:""})
          else
          this.setState({errmsg2:<div className='invalidfeedback'>The length of password should be between 4 and 20!<br/></div>})
        }
        break;
      case true:
        {
          this.setState({errmsg1:""})
          if(this.state.unhashedpwd.length>=4&&this.state.unhashedpwd.length<=20){
            this.setState({errmsg2:""})
              fetch('http://localhost:3001/user/create',{
                  method: "POST",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    username : this.state.CreateUser,
                    password: this.state.CreatePassword,
                    admin: this.state.CreateAdmin
                  })
                })
                .then(response => response.json())
                .then(response => {console.log(response);
                  if (response.id)
                    this.setState({str:<h3>New user created! Ref: {response.id}</h3>})
                  else
                    this.setState({str:<h3>User already exist! Please use another name!</h3>})
                })
          }
          else
          
          this.setState({errmsg2:<div className='invalidfeedback'>The length of password should be between 4 and 20!<br/></div>})
        }
    }
  }
  reset=(e)=>{
    this.setState({str:"",errmsg1:"",errmsg2:""})
  }
  render(){
    return(
      <>
      <Tools title ={"Create User"}/>
      <form>
        <div className='form'>
          <label>UserName: </label>
          <input type = "text" onChange={this.handleusername} required></input><br/>
          <>{this.state.errmsg1}</>
          <label>Password: </label>
          <input type = "text" onChange={this.handlepassword} required></input><br/>
          <>{this.state.errmsg2}</>
          <label>Admin: </label>
          <input type = "checkbox" onChange={this.handleadmin} value="admin"></input><br/>
          <button className='button-15' onClick={this.submit}>Create</button>
          <button className='button-15' type='reset' onClick={this.reset}>New +</button>
        </div>
      </form>
      <div>{this.state.str}</div>
      </>
    )
  }
}
class AdminUserUpdate extends React.Component{
  constructor(props){
    super(props)
    this.state={searchvalue:"", str :"", updateuser:"",updatepassword:"",updateadmin:false,id:"",str2:""}
  }
  handlechangevalue=(e)=>{this.setState({searchvalue:e.target.value})}
  handleclick=(e)=>{
    fetch('http://localhost:3001/user/update',{
    method : "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({username: this.state.searchvalue})
  })
  .then(response=> response.json())
  .then(response => {
    if(response.username)
    {
      this.setState({
        str :"",
        updateadmin: response.admin,
        updateuser: response.username,
        id: response._id
        })
        console.log(response.admin)
        console.log(this.state.updateadmin)
    }
    else{
      this.setState({
        str:<h3>Can't find the user</h3>,
        updateuser:"",
        updatepassword:"",
        updateadmin:false})
    }
  })
  }
  handleusername=(e)=>{
    this.setState({updateuser:e.target.value})
    console.log(this.state.updateuser)
  }
  handlepassword=(e)=>{
    sha256(e.target.value)
    .then(response=>{
    this.setState({updatepassword:response})
    console.log(this.state.updatepassword)
    })
  }
  handleadmin = (e)=>{
    this.setState({updateadmin: !this.state.updateadmin})
    console.log(this.state.updateadmin)
  }
  submit = (e)=>{
    fetch('http://localhost:3001/user/update',{
      method : "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        username: this.state.updateuser,
        password: this.state.updatepassword,
        admin: this.state.updateadmin,
        id: this.state.id})
    })
    .then(response=> response.json())
    .then(response=>{
      console.log(response)
      if(response.success)
      this.setState({str2:<h3>Update successfully</h3>})
      else
      this.setState({str2:<h3>Error! Can't update</h3>})
    }) 
  }
  render(){
    return(
      <>
        <Tools title ={"Update User"}/>
        <Searchbar value={this.state.searchvalue} onClickValue={this.handleclick} onChangeValue={this.handlechangevalue} hint={"UserName"}/>
        <p>{this.state.str}</p>
        <div className='form'>
          <label>UserName: </label>
          <input type = "text" onChange={this.handleusername} value= {this.state.updateuser}></input><br/>
          <label>New password: </label>
          <input type = "text" onChange={this.handlepassword}  ></input><br/>
          <label>Admin: </label>
          <input type = "checkbox"  onChange={this.handleadmin} checked= {this.state.updateadmin} ></input><br/>
          <button className='button-15' onClick={this.submit}>Update</button><br/>
          {this.state.str2}

        </div>
        
      </>
    )
  }
}
class AdminUserDelete extends React.Component{
  constructor(props){
    super(props)
    this.state={searchvalue:"", str :""}
  }
  handlechangevalue=(e)=>{
    this.setState({searchvalue:e.target.value});
    console.log(this.state.searchvalue)
  }
  handleclick=(e)=>{
    console.log(this.state.searchvalue)
    fetch('http://localhost:3001/user/delete',{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usertodel : this.state.searchvalue
      })
    })
    .then(response=> response.json())
    .then(response =>{
      if(response.success)
        this.setState({str:<h3>The user is deleted</h3>})
      else
        this.setState({str:<h3>Can't match the user</h3>})
    })
  }
  render(){
    return(
      <>
        <Tools title ={"Delete User"}/>
        <Searchbar value={this.state.searchvalue} onClickValue={this.handleclick} onChangeValue={this.handlechangevalue} hint={"UserName"}/>
        <p>{this.state.str}</p>
      </>
    )
  }
}

class NoMatch extends React.Component{
  render(){
    return(
      <>
        <Tools title ={"404 Not Found!"}/>
        <p>404 not found!</p>
      </>
    )
  }
}

class Searchbar extends React.Component{
  render(){
    return(
      <>
        <div className="input-group" id ="search">
          <input type="text" value={this.props.value} onChange={this.props.onChangeValue} placeholder={this.props.hint}></input>
          <button className='button-15' onClick={this.props.onClickValue}>Search</button>
        </div>
        <hr></hr>
      </>
    )
  }
}
class Tools extends React.Component{
  constructor(props){
    super(props)
    this.state={leave: false}
  }
  render(){
    return(
      <>
        <div className='container' id='toolbar'>
          <div className='row'>
            <div className='col-10'>
            <h2>{this.props.title}</h2>
            </div>
            <div className='col-2 '>
            <button onClick ={logout} ></button>
            </div> 
          </div>
        </div>
      </>
    )
  }
}


const Locationpage = (e) => {

  

  const { venuename } = useParams();
  
  const detailresult = locationdata.find(({ _id }) => _id == venuename);    
  
    const center = {
      lat: detailresult.lat,
      lng: detailresult.long
    };
    const [query, setQuery] = useState("");
  
      const comment = [];
    const test = () => {
	
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let Comments = {
        Location: venuename,
        User : user,
        UserComment: query,
        Time: date
      }
      fetch("http://localhost:3001/loc",{
        method:"POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": 'application/json'
        },

        body: JSON.stringify(Comments)


      })      
      console.log(Comments);
    }
var detailoc = fetch("http://localhost:3002/loc/"+venuename)
  .then(response=>response.json())
  .then(response=>{console.log(response)
  
  console.log("hellp"+(response).map(a => {return {...a}}))
  console.log(response[0].title)
  })
  return (

  <>
  <Tools title={ detailresult.name }/>
  <LoadScript
    googleMapsApiKey="AIzaSyCq8ponmNAm-WhteFQCysUbZ4Hwi6uWq48"
  >
    <div className="row">
    <div className="">
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >

    <Marker position={{lat: detailresult.lat, lng: detailresult.long }}></Marker>
    
    </GoogleMap>
    </div>
        <div className=" ">
        <table class="table">
    <thead>
      <tr> 
        <th scope="col">Venue Detail</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Venue Name:</td>
        <td>{ "Hello" }</td>
      </tr>
    </tbody>
  </table>

  <table class="table">
  <thead>
      <tr> 
        <th scope="col">Event</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title:</td>
        <td>{"Hello"}</td>
      </tr>
      <tr>
        <td>Date:</td>
        <td>{ "Hello"  }</td>
      </tr>
      <tr>
        <td>Time:</td>
        <td>{ "Hello" }</td>
      </tr>
      <tr>
        <td>Price:</td>
        <td>{ "Hello"  }</td>
      </tr>
      <tr>
        <td>Describtion:</td>
        <td>{ "Hello" }</td>
      </tr>
      <tr>
        <td>Presenter:</td>
        <td>{ "Hello" }</td>
      </tr>
    </tbody>
  </table>
      <div class="mb-3">
            <label for="new-comment" class="form-label">New Comment</label>
            <textarea class="form-control" id="new-comment" rows="3" onChange={e=> setQuery(e.target.value) }></textarea>
      </div>
    <button type="button" className="btn btn-primary" onClick={() => test()}>Add comment</button>
        </div>
        </div>
  </LoadScript>
  
  </>
)

}

const UserHome = () => {  
  


  const [query, setQuery] = useState("");
    const AddFav = (a) => {
      const result = venuelocation.find(({ Venuename }) => Venuename == a);
      favlist.push(result);
      updateLocalStorage(result);
      alert(a + " have added to favourite location.")
      //console.log(JSON.stringify(favlist));
    }

  const [data, setdata] = useState(locationdata);
  const [order, setorder] = useState("ASC");

    const listvenuename = data.filter((venue) => 
      venue.name.toLowerCase().includes(query)).map((venue) =>
      
      <tr key={venue.name}>
        <td id ="venue"> <Link to={`/loc/${venue._id}`} locid={venue._id}>{venue.name}</Link></td>
        <td id ="eventcount">{venue.__v}</td>
        <td><button onClick={() => AddFav(venue.name)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg></button></td>
      </tr>

    );
    const venuemark = locationdata.map((venue1) =>
      <Marker position={{lat: venue1.lat, lng: venue1.long}}></Marker>
    );

    const sort = (col) =>{
      if(order === "ASC"){
        const sorted = [...data].sort((a, b) =>
          parseInt(a[col]) > parseInt(b[col]) ? 1 : -1);
        setdata(sorted);
        setorder("DSC");
      }
      if(order === "DSC"){
        const sorted = [...data].sort((a, b) =>
          parseInt(a[col]) < parseInt(b[col]) ? 1 : -1);
        setdata(sorted);
        setorder("ASC");
      }
    }

    
    //console.log(venuelocation.filter(venue=> venue.Venuename.toLowerCase().includes("Film")));
  return ( 
    <><Tools title="Home"/>
    <LoadScript
      googleMapsApiKey="AIzaSyCq8ponmNAm-WhteFQCysUbZ4Hwi6uWq48"
    >
      <div className="row">
        <div className="col-md-6">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        { /* Child components, such as markers, info windows, etc. */ } 
        {venuemark}
        <></>
      </GoogleMap>
      </div>
      <div className="col-md-6">
      
      <div class="input-group mb-3">      
      <input class="form-control" id="myInput" type="text" placeholder="Search.." aria-describedby="basic-addon1" onChange={e=> setQuery(e.target.value) } />
      <div class="input-group-prepend">
        <button class="input-group-text" id="basic-addon1" onClick={() => sort("__v")}>

          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
          <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
          </svg>
        </button>
      
      
      </div>
      </div>

      <table className="table" id="table1">
      <thead>
        <tr> 

                <th scope="col"  id="eventcount">Venue Name</th>
                <th scope="col" id="eventcount">Event No.</th>
        </tr>
      </thead>
      <tbody>
        {listvenuename}
      </tbody>
    </table>
      </div>
      </div>
    </LoadScript>
    </>
  )

}

class Favourite extends React.Component {
  render() {
    
    const revFav = (a) => {
      const result = venuelocation.find(({ Venuename }) => Venuename == a);

      favlist.pop(result);
      updateLocalStorage(result);
      alert(a + " have remove from favourite location.")
      //console.log(JSON.stringify(favlist));
    }
    const favvenuemark = favlist.map((venue1) =>
      <Marker position={{lat: venue1.latitude, lng: venue1.longitude }}></Marker>
    );

    const listfavvenue = favlist.map((venue) => 
    <tr>
      <td> <Link to={`/loc/${venue.Venuename}`}>{venue.Venuename}</Link></td>
      <td>{venue.latitude}</td>
      <td>{venue.longitude}</td>
      <td><button onClick={() => revFav(venue.Venuename)}>Remove from Favourite</button></td>
    </tr>
  );


    return (
      <>
      <Tools title="Favourite"/>
      <LoadScript
      googleMapsApiKey="AIzaSyCq8ponmNAm-WhteFQCysUbZ4Hwi6uWq48"
    >
  <div className="row">
    <div className="col-md-6">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        { /* Child components, such as markers, info windows, etc. */ } 
        {favvenuemark}
        <></>
      </GoogleMap>
      </div>
          <div className="col-md-6">
          <input class="form-control" id="myInput" type="text" placeholder="Search.." />
          <br/>
          <table class="table">
            <thead>
              <tr> 
                <th scope="col">Venue Name</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th> 
              </tr>
            </thead>
            <tbody>
            {listfavvenue}
            </tbody>
          </table>



      </div>
      </div>
      </LoadScript>
      </>
      )
  }
}


function logout(){
  window.location.href = '/'
  alert("Logout")
}
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={account:'',password:'',errmsg1:""}
    this.handlelogin = this.handlelogin.bind(this);
    this.handlechange1 = this.handlechange1.bind(this);
    this.handlechange2 = this.handlechange2.bind(this);
  }
  
  handlelogin(e) {
    e.preventDefault();
    fetch('http://localhost:3001/1',{
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account : this.state.account,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(response => {
      var res = response
      console.log(res)
      
      if(res['user'])
        if(res['admin']){   //admin
          root.render(<AdminPage username={this.state.account}/>)
        }
        else  //normal user
        {
          
          fetch('http://localhost:3001/testv3',{
            method: "GET",
            headers: {
              //'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(response=>response.json())
          .then(response=>{
            console.log(response);
            locationdata = response.map(a => {return {...a}});
            console.log(locationdata)
            

            root.render(<UserPage username={this.state.account}/>)
          })
        }          
      else  //non user
        {
          this.setState({errmsg1:<div  className='invalidfeedback'>Wrong account or password!!!</div>})
        }
    });
  }
  handlechange1(e){
    this.setState({account: e.target.value})
    
  }
  handlechange2(e){
    sha256(e.target.value)
    .then(response=>{
    this.setState({password:response})
    })
  }
  render(){
    return(
      <>
        <div className='form'>
          <div className='container' >
            <div id = "login" className='row justify-content-center'>
                  <div className='col-4' id = "logintitle">
                    <h1>LCSD Cultural Programmes</h1>
                    <h1>Web Application</h1>
                  </div>
                  <div className='col-4'>
                    <form onSubmit={this.handlelogin}>
                      <label>Account: </label>
                      <input type="text" id ="user" name="account" onChange={this.handlechange1}></input>
                      <br></br>
                      <label>Password: </label>
                      <input type="password" id = "pwd" name ="password" onChange={this.handlechange2}></input>
                      <>{this.state.errmsg1}</>
                      
                      <button value="Submit" className='button-53'>Login</button><br/>
                      
                    </form>
                </div>
            </div>
          </div>
        </div>
      </>  
    )
  }
}



const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<Login/>);

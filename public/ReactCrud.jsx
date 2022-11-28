var StudentAll = React.createClass({   
  
  getInitialState: function () {  
    return { name: '' ,lastname: '' ,address: '' ,email: '' ,dob: '' ,contact: '' ,about: '' ,id: '' ,Buttontxt:'Save', data1: []};  
  },  
   handleChange: function(e) {  
        this.setState({[e.target.name]: e.target.value});  
    },  
  
  componentDidMount() {  
   
    $.ajax({  
       url: "api/getdata",  
       type: "GET",  
       dataType: 'json',  
       ContentType: 'application/json',  
       success: function(data) {           
         this.setState({data1: data});   
           
       }.bind(this),  
       error: function(jqXHR) {  
         console.log(jqXHR);  
             
       }.bind(this)  
    });  
  },  
    
DeleteData(id){  
  var studentDelete = {  
        'id': id  
           };        
    $.ajax({  
      url: "/api/Removedata/",  
      dataType: 'json',  
      type: 'POST',  
      data: studentDelete,  
      success: function(data) {  
        alert(data.data);  
         this.componentDidMount();  
  
      }.bind(this),  
      error: function(xhr, status, err) {  
         alert(err);   
             
            
      }.bind(this),  
      });  
    },  
   
    EditData(item){           
   this.setState({name: item.name,lastname:item.lastname,address:item.address,contact:item.contact,dob:item.dob,email:item.email,about:item.about,id:item._id,Buttontxt:'Update'});  
     },  
  
   handleClick: function() {  
   
   var Url="";  
   if(this.state.Buttontxt=="Save"){  
      Url="/api/savedata";  
       }  
      else{  
      Url="/api/Updatedata";  
      }  
      var studentdata = {  
        'name': this.state.name,  
        'lastname':this.state.lastname,
        'address':this.state.address, 
         'dob':this.state.dob,
        'email':this.state.email,  
        'contact':this.state.contact, 
        'about':this.state.about,

        'id':this.state.id,  
          
    }  
    $.ajax({  
      url: Url,  
      dataType: 'json',  
      type: 'POST',  
      data: studentdata,  
      success: function(data) {         
          alert(data.data);         
          this.setState(this.getInitialState());  
          this.componentDidMount();  
           
      }.bind(this),  
      error: function(xhr, status, err) {  
         alert(err);       
      }.bind(this)  
    });  
  },  
  
  render: function() {  
    return (
  
      <div  className="container"  style={{marginTop:'50px'}}>  
       <p className="text-center" style={{fontSize:'25px'}}><b>STUDENT MANAGEMENT SYSTEM</b></p>  
       <br>
       </br>
       
  <form>  
    <div className="col-sm-12 col-md-12"  style={{marginLeft:'100px'}}>   
   
     <tbody>  
    <tr>  
      <b>FirstName :</b>  
      <td>  
         <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />  
          <input type="hidden" value={this.state.id}    name="id"  />  
      </td>
        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <td><b>LastName  :</b></td>  
      <td>  
      <input type="text" className="form-control" value={this.state.lastname}  name="lastname" onChange={ this.handleChange } />  
      </td>  
    </tr>  
    &nbsp;
    <tr>  
      <td><b>Location  :</b></td>  
      <td>  
      <input type="text" className="form-control" value={this.state.address}  name="address" onChange={ this.handleChange } />  
      </td>  
    </tr>  
    &nbsp;
    <tr>  
      <td><b>  Email     :</b></td>  
      <td>  
        <input type="email"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } />  
      </td>  
    </tr>  
    &nbsp;
    <tr>  
      <td><b>DOB :</b></td>  
      <td>  
      <input type="date" className="form-control" value={this.state.dob}  name="dob" onChange={ this.handleChange } />  
      </td>  
    </tr>  
    &nbsp;
  
    <tr>  
      <td><b>Education :</b></td>  
      <td>  
        <input type="text"  className="form-control" value={this.state.contact}  name="contact" onChange={ this.handleChange } />  
      </td>  
    </tr>  
    &nbsp;
  
    <tr>  
      <td><b>About :</b></td>  
      <td>  
        <input type="text"  className="form-control" value={this.state.about}  name="about" onChange={ this.handleChange } />  
      </td>  
    </tr>  
    &nbsp;
    <tr>  
      <td></td>  
      <td>  
        <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />  
      </td>  
    </tr>  
    &nbsp;
  
 </tbody>  
    
</div>  
   
  
<div className="col-sm-12 col-md-12 "  style={{marginTop:'100px',marginLeft:'50px', width:'500px',height: '100px'}} >  
   
 <table className="table-bordered" style={{width:"200%"}}><tbody>  
   <tr><th><b> ID </b></th><th><b> FIRSTNAME </b></th><th><b> LASTNAME </b></th><th><b> LOCATION </b></th><th><b> DOB </b></th><th><b> EMAIL </b></th><th><b> EDUCATION </b></th><th><b> ABOUT </b></th><th><b> EDIT </b></th><th><b> DELETE </b></th></tr>  
    {this.state.data1.map((item, index) => (  
        <tr key={index}>  
           <td>{index+1}</td>   
          <td>{item.name}</td>  
          <td>{item.lastname}</td>                      
          <td>{item.address}</td> 
          <td>{item.dob}</td> 
          <td>{item.email}</td>  
          <td>{item.contact}</td>
          <td>{item.about}</td>  
           <td>   
            
           <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item) }}>Edit</button>      
          </td>   
          <td>   
             <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>  
          </td>   
        </tr>  
    ))}  
    </tbody>  
    </table> 
    <br></br>
    <br>
    </br> 
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
     </div>  
</form>          
      </div>  
    );  
  }  
});  
<br>     </br>
  
ReactDOM.render(<StudentAll  />, document.getElementById('root'))  
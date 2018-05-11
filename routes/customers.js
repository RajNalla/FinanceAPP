
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM employee',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('customers',{page_title:"customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){
    
    var id = req.params.EmployeeID;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM employee WHERE EmployeeID = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            EmployeeID : input.EmployeeID,
            EmployeeName : input.EmployeeName,
            salary   : input.salary,
            designtion  : input.designtion,
        
        };
        
        var query = connection.query("INSERT INTO employee set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.EmployeeID;
       
    req.getConnection(function (err, connection) {
        
        var data = {
            
            EmployeeID   : input.EmployeeID,
            EmployeeName : input.EmployeeName,
            salary  : input.salary,
            designtion  : input.designtion,
        
        };
        
        connection.query("UPDATE employee set ? WHERE EmployeeID = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};


exports.delete_employee = function(req,res){
          
     var id = req.params.EmployeeID;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM employee  WHERE EmployeeID  = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};



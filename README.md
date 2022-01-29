# merchant_service_project

### Architecture Diagram of the Merchant Service
![Untitled Diagram drawio](https://user-images.githubusercontent.com/87803723/151661634-132e3985-3905-4b1f-ad77-d79ab9f57720.png)


### An Entity Relational Diagram of the merchant service data model
![Untitled Diagram drawio (1)](https://user-images.githubusercontent.com/87803723/151662363-87c65b96-a784-49c2-a043-2622cfc11d46.png)

### Register an account
Method:POST

URL: http://localhost:3000//merchant/register

Data: 

{

	"id": "nayaya",

	"name": "naya",
  
  "password": "kednw",
  
  "address": "10 Bandung",
  
  "phone_number": "32442445"

}
 ### delete its account
 
 Method: DELETE
 
 URL: http://localhost:3000///merchant/:id/product/
 
 ### add products
 
 Method: PUT
 
  URL: http://localhost:3000//merchant/:id/product
  
  ### function apiResponse
  
  {"status": 200,
  "error": null,
  "response": results}
 
 

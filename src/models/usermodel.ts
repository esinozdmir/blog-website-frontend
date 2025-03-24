export class User {
    id?:number;
    email:string;
    firstName:string;
    lastName:string;

    //Partial içerisindeki her şeyi parçalı halde kullanmayı sağlıyor
    constructor(response: Partial<User>={}){
        this.id=response.id;
        this.email=response.email || '';
        this.firstName=response.firstName || '';
        this.lastName=response.lastName || '';
    } 
}
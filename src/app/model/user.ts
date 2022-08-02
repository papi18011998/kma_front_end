export  class User{
  public  id:number
  public  userId:string
  public  firstName:string
  public  lastName:string
  public  userName:string
  public  password:string
  public  email:string
  public  profileImageUrl:string
  public lastLoginDate:Date
  public lastLoginDateDisplay:Date
  public joinDate:Date
  public  role:string
  public authorities:string[]
  public isActive:boolean
  public isNotLocked: boolean


  constructor(id: number, userId: string, firstName: string, lastName: string, userName: string, password: string, email: string, profileImageUrl: string, lastLoginDate: Date, lastLoginDateDisplay: Date, joinDate: Date, role: string, authorities: string[], isActive: boolean, isNotLocked: boolean) {
    this.id = id;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.profileImageUrl = profileImageUrl;
    this.lastLoginDate = lastLoginDate;
    this.lastLoginDateDisplay = lastLoginDateDisplay;
    this.joinDate = joinDate;
    this.role = role;
    this.authorities = authorities;
    this.isActive = isActive;
    this.isNotLocked = isNotLocked;
  }


}

import { User } from "./user";

export class Article 
{
    id: string;
    title: string;
    description: string;
    price: number;
    region: string;
    comunne: string;
    user: string;
    category: string;

    _userData:User = null;
    _getUserDataFunc:(userId:string) => any;

    constructor(id:string ,user:string, title:string, description:string, price:number, region:string, comunne:string, category: string)
    {
        this.id = (id?id:"");
        this.user = (user?user:"");
        this.title = (title?title:"");
        this.description = (description?description:"");
        this.price = (price?price:0);
        this.region = (region?region:"");
        this.comunne = (comunne?comunne:"");
        this.category = (category?category:"");

        if(!id)
            console.error("[INTERNO]: Articulo sin id.")
        if(!user)
            console.error("[INTERNO]: Articulo ",  this.id,  " sin id de usuario." )
        

    }

    public setUserDataFunction(dataFunc:any)
    {
        this._getUserDataFunc = dataFunc;
    }

    public getUser():User
    {   

        if(!this.user)
        {
            console.error("[INTERNO]: Articulo ",  this.id,  " sin id de usuario." )
            return null
        }
        if(!this._userData)
        {
            if(this._getUserDataFunc != null )
            {
                this._userData = this._getUserDataFunc(this.user);
            }
            else
            {
                console.error("[INTERNO]: Articulo ",  this.id,  " sin definir como obtener info usuarios." )
            }
            return this._userData;
        }
        return null;
    }
}
import { Rule } from "sanity";

export const post = {
    name:"post",
    title:'Post',
    type:'document',
    fields:[
        {
            name:"title",
            title:'Title',
            type:'string',
            validation:(Rule:Rule)=>Rule.required().error('Required')
        },
        {
            name:"slug",
            title:'Slug',
            type:'slug',
            options:{source:'title'}
        },
        {
            name:'publishedAt',
            title:"Published at",
            type:"datetime",
            initialvalue:()=>new Date().toISOString()
        },
        {
            name:'excerpt',
            title:"Excerpt",
            type:"text"
        },
        {
            name:'body',
            title:"Body",
            type:"array",
            of:[
                {type:"block"},
                {
                    type:'image',
                    fields:[
                        {type:'text',name:'alt',title:'alt'}
                    ]
                }
            ]
        },
        {
            name:'tags',
            title:'Tags',
            type:'array',
            of:[{type:'reference',to:[{type:'tag'}]}]
        }
    ]
}
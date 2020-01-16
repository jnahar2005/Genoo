import * as React from "react";
import { getJokesCollection } from "../api/jokesApi";

const useJokeCollection = () => {
    const [jokeCollection, setJokeCollection] = React.useState<any[]>([]);

    const loadJokeCollection = (path,data={}) => {
        if(path==="blank"){
            setJokeCollection([])
        }else{
            getJokesCollection(path,data).then(jokeCollection =>
                setJokeCollection(jokeCollection)
            );
        }
    };

    return { jokeCollection, loadJokeCollection };
};

const useJokeSearchCollection = () => {
    const [jokeSearchCollection, setJokeSearchCollection] = React.useState<any[]>([]);
  
    const loadJokeSearchCollection = (path,data={}) => {
        if(path==="blank"){
            setJokeSearchCollection([])
        }else{
            getJokesCollection(path,data).then(jokeSearchCollection =>
                setJokeSearchCollection(jokeSearchCollection)
            );
        }
    };
  
    return { jokeSearchCollection, loadJokeSearchCollection };
};

const useCategoryCollection = () => {
    const [categoryCollection, setCategoryCollection] = React.useState<any[]>([]);
  
    const loadCategoryCollection = (path,data={}) => {
      getJokesCollection(path,data).then(categoryCollection =>
        setCategoryCollection(categoryCollection)
      );
    };
  
    return { categoryCollection, loadCategoryCollection };
};




export const JokesComponent = () => {
  
    let { jokeCollection, loadJokeCollection } = useJokeCollection();
    let { jokeSearchCollection, loadJokeSearchCollection } = useJokeSearchCollection();
    let { categoryCollection, loadCategoryCollection } = useCategoryCollection();


    const onChangeSelect = () => (e: React.ChangeEvent<HTMLInputElement>) => {
        loadJokeSearchCollection("blank");
        loadJokeCollection("random", {"category":e.target.value});
    };

    const onChangeInput = () => (e: React.ChangeEvent<HTMLInputElement>) => {
        loadJokeCollection("blank");
        loadJokeSearchCollection("search", {"query" : e.target.value});
    };


    React.useEffect(() => {loadJokeCollection("random"); loadCategoryCollection("categories");}, []);

    return (
        <>
            <select className="form-control p-input" name="category" onChange={onChangeSelect()}>  
                <option value="">--Select--</option>
                {categoryCollection.map((item)=>{
                    return <option value={item}>{item}</option>
                })}
            </select>

            <input onChange={onChangeInput()}/>
            
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Joke</th>
            
                    </tr>
                </thead>
            
                <tbody>

                { jokeSearchCollection.result?
                    jokeSearchCollection.result.map((item,index) =>
                    <tr>
                        <td>{index+1}</td>
                        <td><span>{item.value}</span></td>
                    </tr>
                    ):
                    <tr>
                        <td>1</td>
                        <td><span>{jokeCollection.value}</span></td>
                    </tr>
                }
                
                </tbody>
            </table>
        </>
    );
};
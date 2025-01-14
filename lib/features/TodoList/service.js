import axios from "axios"
import store from "../../store"
import { loading, todoSuccess , error } from "./reducers";
import TodoList from "../../../components/TodoList";


export async function getTodos(){
    store.dispatch(loading(true));
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");

    if (response.status === 200){
        store.dispatch (todoSuccess(response.data))
    }
    else {
        store.dispatch(error("error:"+response.status + "" + response.statusText))

    }
    store.dispatch(loading(false));


}
export async function addTodo ( todo) {

    store.dispatch(loading(true));
    const response = await axios.post("https://jsonplaceholder.typicode.com/todos",todo);

    if (response.status === 201){
        const previousTodos = store.getState().todoList.todoList;
        store.dispatch (todoSuccess([response.data,...previousTodos]))
    }
    else {
        store.dispatch(error("error:"+response.status + "" + response.statusText))

    }
    store.dispatch(loading(false));


}


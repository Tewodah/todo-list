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
export async function updateTodoStatus(payload){
    const {id , completed } = payload

    const response = await axios.put (`https://jsonplaceholder.typicode.com/todos/${id}`,payload);
    if(response.status === 200 ){
        const previousTodos = store.getState().todoList.todoList;
        const updateTodoStatus = previousTodos.map(todo => {
            if (todo.id=== id){
            return {
                ...todo , ...response.data

            }

            }
            else {
                return todo;
            }
        })
        store.dispatch(todoSuccess(updateTodoStatus))
    }
 else {
    store.dispatch(error("error:"+response.status + "" + response.statusText))
 }

}
export async function deleteTodo (payload){
    const {id , completed } = payload
    const response = await axios.delete (`https://jsonplaceholder.typicode.com/todos/${id}`);

    if(response.status === 200 ){
        const previousTodos = store.getState().todoList.todoList;
        const updateTodoStatus = previousTodos.filter(todo => todo.id !==id);
        store.dispatch(todoSuccess(updateTodoStatus))
    }
 else {
    store.dispatch(error("error:"+response.status + "" + response.statusText))
 }
}


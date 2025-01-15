import { StatusBar } from "expo-status-bar";
import {useEffect} from "react";
import {StyleSheet,Text, View,TextInput,ScrollView, Button, TouchableOpacity,} from "react-native";
import { useSelector } from "react-redux";
import { error, loading } from "../lib/features/TodoList/reducers";
import { getTodos,  updateTodoStatus , deleteTodo} from "../lib/features/TodoList/service";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TodoList({ navigation }) {
  const {todoList , loading , error } = useSelector((state)=> state.todoList);

function changeTodostatus(todo){

  updateTodoStatus({id: todo.id , completed : !todo.completed});

}



  useEffect(()=> {
  getTodos();
 },[]);

if (loading ===true){
  return <Text style={styles.loading}>loading...</Text>
}
if (error ===true){
  return <Text style={styles.error}>error...</Text>
}

  return (
    <View style={styles.container}>
      <Button
        style={styles.addTodo}
        title="Add Todo"
        onPress={() => navigation.navigate("todoForm")}
      />
      <Text style={styles.title}>Todo-Lists</Text>
      <TextInput placeholder="search" style={styles.input}></TextInput>
      <ScrollView>
        {todoList.map((todo, i) => (
          <View style={styles.todocontainer} key={i}>
          <Text style = {styles.todoText}>{todo.title} </Text>
          <TouchableOpacity onPress={() => changeTodostatus(todo)}>
          <MaterialCommunityIcons 
          name={todo.completed? "checkbox-marked":"checkbox-blank"} 
          size={40} 
          color= { todo.completed? "green" :"gray" }
          style = {{paddingHorizontal :30}}
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteTodo({id:todo.id})}>
          <MaterialCommunityIcons 
          name="delete"
          size={40} 
          color=  "red"
          style = {{paddingHorizontal :30}}
          />
          </TouchableOpacity>
       
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loading:{
    color: "#fff",
    backgroundColor: "#F0F0F0",
    Text: "#3333333",
    width: 400,
    padding: 10,
  },
 error:{
    color: "#fff",
    backgroundColor: "#F0F0F0",
    Text: "#3333333",
    width: 400,
    padding: 10,
  },
  addTodo: {
    color: "#fff",
    backgroundColor: "#fff",
    Text: "#3333333",
    width: 400,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "gray",
    fontSize: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "600",
    fontFamily: "gothic, sans-serif",
  },
  input: {
    color: "#fff",
    backgroundColor: "#000",
    Text: "#3333333",
    width: 400,
    padding: 10,
    margin: 25,
  },
  
  todocontainer:{
 flexDirection: "row",
 alignItems: "center",
 justifyContent:"space-between",
 color: "#000",
  backgroundColor: "white",
  },

  todoText: {
    Text: "#3333333",
    width: 400,
    padding: 20,
   
  },
});

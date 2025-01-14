import { StatusBar } from "expo-status-bar";
import {useEffect} from "react";
import {StyleSheet,Text, View,TextInput,ScrollView, Button,} from "react-native";
import { useSelector } from "react-redux";
import { error, loading } from "../lib/features/TodoList/reducers";
import { getTodos } from "../lib/features/TodoList/service";

export default function TodoList({ navigation }) {
  const {todoList , loading , error } = useSelector((state)=> state.todoList);

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
      <Text style={styles.title}>Todolist App!</Text>
      <TextInput placeholder="search" style={styles.input}></TextInput>
      <ScrollView>
        {todoList.map((todo, i) => (
          <Text key={i} style={{...styles.todoText, backgroundColor:todo.completed? "green": ""}}>
            {todo.title}
          
          </Text>
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
    backgroundColor: "#b0b6fc",
    fontSize: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 100,
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

  todoText: {
    color: "#000",
    backgroundColor: "#fff",
    Text: "#3333333",
    width: 400,
    padding: 10,
    margin: 25,
  },
});

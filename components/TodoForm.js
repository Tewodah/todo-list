
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from "react-native";
import { useSelector } from "react-redux";

import { addTodo } from "../lib/features/TodoList/service";

export default function TodoForm({ navigation }) {
  const { loading, error } = useSelector((state) => state.todoList);
  const [todo, setTodo] = React.useState("");

  function saveTodo(params) {
    addTodo({
      title: todo,
      completed: false,
    });
    navigation.goBack();

  }
  if (loading === true) {
    return <Text style={styles.loading}>loading...</Text>
  }
  if (error === true) {
    return <Text style={styles.error}>error...</Text>
  }



  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/R.jpg')} style={{ width: '100%', height: '30%' }} />
        <Button
          style={styles.backButton}
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Todo List - Form</Text>
        <TextInput placeholder="write your tasks here..." onChangeText={setTodo} style={styles.input}></TextInput>
        <Button title="add Task" onPress={saveTodo} />
      </View>
    </>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  loading: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    width: 400,
    padding: 10,
  },
  error: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    width: 400,
    padding: 10,
  },
  backButton: {
    color: "#fff",
    backgroundColor: "#F0F0F0",
    width: 400,
    padding: 10,


  },
  title: {
    padding: 30,
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "gothic, sans-serif",
    textAlign: "center",
  },
  input: {
    color: "BLACK",
    backgroundColor: "GRAY",
    Text: "#3333333",
    padding: 10,
    margin: 25,
    textAlign: "start",
    boxShadow: "0 0 10px 0 rgba(48, 14, 238, 0.6)",
  },
  saveTodo: {
    color: "#fff",
    Text: "#3333333",
    width: 400,
    padding: 60,
  },
});

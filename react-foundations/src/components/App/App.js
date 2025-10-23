import React, { useState } from "react";

import Post from '../Post/Post';
import Header from "../Header/Header";

import { ThemeProvider } from '../../context/ThemeContext'

import { Title } from "./styles";

function App() {
    
    const [posts, setPosts] = useState([
        { id: Math.random(), title: 'Imovel#01', subtitle: 'Sub#01', read: false, removed: true},
        { id: Math.random(), title: 'Imovel#02', subtitle: 'Sub#02', read: true, removed: false},
        { id: Math.random(), title: 'Imovel#03', subtitle: 'Sub#03', read: false, removed: false},
        { id: Math.random(), title: 'Imovel#04', subtitle: 'Sub#04', read: false, removed: false},
    ]);
          
    function handleRefresh() {
        setTimeout(() => {
            setPosts((prevState) => [
                ...prevState,
                {
                    id: Math.random(),
                    title: `Imovel#0${prevState.length + 1}`,
                    subtitle: `Sub#0${prevState.length + 1}`,
                },
            ]);
        }, 1);
    };
    
    function handleRemovePost(postId) {
        setPosts((prevState) => prevState.map(
            post => (
                post.id === postId
                    ? { ... post, removed: true }
                    : post
            )
        ));
    };

    return (
        <ThemeProvider>
            <Header 
                title='Catálogo de Imóveis'  
            >
                <Title as='h2'>
                    Apartamentos
                    <button onClick={handleRefresh}>Atualizar</button>
                </Title>
            </Header>

            <hr />

            {posts.map(post => (
                <Post
                    key={post.id}
                    onRemove={handleRemovePost}
                    post={post} 
                />
            ))}
        </ThemeProvider>

    );
}

export default App;
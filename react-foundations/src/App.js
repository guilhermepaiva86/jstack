import React, { useState } from "react";

import Post from './Post';
import Header from "./Header";

import { ThemeProvider } from './ThemeContext'

function App() {
    
    const [posts, setPosts] = useState([
        { id: Math.random(), title: 'Imovel#01', subtitle: 'Sub#01', read: false},
        { id: Math.random(), title: 'Imovel#02', subtitle: 'Sub#02', read: true},
        { id: Math.random(), title: 'Imovel#03', subtitle: 'Sub#03', read: false},
        { id: Math.random(), title: 'Imovel#04', subtitle: 'Sub#04', read: false},
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
        setPosts((prevState) => ( 
            prevState.filter(post => post.id !== postId)
        ));
    };

    return (
        <ThemeProvider>
            <Header 
                title='Catálogo de Imóveis'  
            >
                <h2>
                    Apartamentos
                    <button onClick={handleRefresh}>Atualizar</button>
                </h2>
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
"use client";

import { useEffect, useState } from "react";
import CharacterCard from "../../components/CharacterCard";
import styles from "../home/Home.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    const [search, setSearch] = useState("");
    const [characters, setCharacters] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchCharacters = async (name = "", pageNumber = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${name}`);
            setCharacters(data.results);
            setTotalPages(data.info.pages);
            setNotFound(false);
        } catch {
            setNotFound(true);
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(search, page);
    }, [search, page]);

    const handleSearch = () => {
        setPage(1);
        fetchCharacters(search, 1);
    };

    const handleReset = () => {
        setSearch("");
        setPage(1);
        fetchCharacters("", 1);
        toast.success("Filtro foi resetado", { position: "top-left" });
    };

    const handleCardClick = (name) => {
        toast.success(`Você clicou em ${name}`, {});
    };

    return (
        <div className={styles.container}>
            <ToastContainer 
                position="top-right"
                autoClose={7500}
                theme="light"
            />
            <h1 className={styles.title}>Personagens de Rick and Morty 🧩</h1>
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.input}
                />
                <button
                    onClick={handleSearch}
                    className={styles.buttonSearch}
                >
                    Buscar
                </button>
                <button
                    onClick={handleReset}
                    className={styles.buttonReset}
                >
                    Resetar
                </button>

                <div className={styles.navControls}>
                    <button 
                        onClick={() => setPage((p) => Math.max(p - 1, 1))} 
                        disabled={page === 1 || notFound || loading} 
                        className={styles.buttonNav}
                    >
                        Página Anterior
                    </button>

                    <span className={styles.pageIndicator}>
                        Página {page} de {totalPages}
                    </span>

                    <button 
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))} 
                        disabled={page === totalPages || notFound || loading} 
                        className={styles.buttonNav}
                    >
                        Próxima Página
                    </button>
                </div>
            </div>
            {loading && <h1 className={styles.loading}>Carregando...</h1>}
            {notFound && <h1 className={styles.notFound}>Nenhum personagem encontrado 😢</h1>}
            <div className={styles.grid}>
                {characters.map((char) => (
                    <CharacterCard
                        key={char.id}
                        character={char}
                        onClick={() => handleCardClick(char.name)}
                    />
                ))}
            </div>
        </div>
    );
}
import { useState, useEffect } from "react";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import ProfileFollowers from "../src/components/ProfileFollowers";
import ProFileSideBar from "../src/components/ProfileSideBar";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

export default function Home() {
  const githubUser = "lucaspires-source";
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
    "yagoalvesr",
    "mrncrds",
    "didiraja",
  ];

  const [comunidades, setComunidades] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDados = new FormData(e.target);

    const comunidade = {
      title: formDados.get("title"),
      imageUrl: formDados.get("image"),
      creatorSlug:githubUser
    };

    fetch('/api/comunidades',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(comunidade)
    })
    .then(async(res) => {
      const data =  await res.json()
      const comunidade = data.registroCriado
      let novasComunidades = [...comunidades, comunidade];
      setComunidades(novasComunidades);
    })


  };

  const [seguidores, setSeguidores] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => {
        return res.json();
      })
      .then((resCompleta) => {
        setSeguidores(resCompleta);
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        'Authorization': "bb208ec473a32039ad5d9cef6a7d96",
        "Content-Type": "application/json",
        'Accept': "application/json",
      },
      body: JSON.stringify({
        query: `query{
      allCommunities {
        id
        title
        imageUrl
        creatorSlug
      }
    }
      `,
      }),
    })
      .then((res) => res.json())
      .then((resCompleta) => {
        const comunidades = resCompleta.data.allCommunities;
        setComunidades(comunidades);
      })
  }, []);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProFileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem Vindo(a)!</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Qual vai ser o nome de sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome de sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa?"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa?"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileFollowers title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.id}>
                      <img src={itemAtual.imageUrl} alt={itemAtual.title} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

const ProfileFollowers = (props) => {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
        <ul>
          {/* {seguidores.map((itemAtual) => {
            return (
              <li key={itemAtual}>
                <a href={`https://github.com/${itemAtual}.png`}>
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })} */}
        </ul>
      </ProfileRelationsBoxWrapper>
    )
  }


  export default ProfileFollowers
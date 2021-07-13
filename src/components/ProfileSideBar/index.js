import Box from '../Box'
import {AlurakutProfileSidebarMenuDefault} from '../../lib/AlurakutCommons'

const ProFileSideBar = (props) => {

    return (
      <Box>
        <img
          src={`https://github.com/${props.githubUser}.png`}
          style={{ borderRadius: "8px" }}
        />
        <hr />
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
        <hr />
        <AlurakutProfileSidebarMenuDefault props={props.githubUser} />
      </Box>
    );
  };

  export default ProFileSideBar
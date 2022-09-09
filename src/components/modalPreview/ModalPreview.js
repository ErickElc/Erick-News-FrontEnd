import { useModalContext } from "../../context/modalContext";
import ReactMarkdown from "react-markdown";
import { Box, Modal } from "@mui/material";
import { StyleModal } from "./stlyeModal";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import './style.scss';
export default function ModalPreview(props){
    const modalContext  = useModalContext();
    function ToggleMode(){
        modalContext.OpenModal()
    }
    console.log(props.inputs.description);
    return(
        <Modal
            open={(modalContext.modalState.open === true) ? true : false}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={StyleModal}>
                <div>
                    <button onClick={ToggleMode} className="Button-back" >X</button>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className='markdown2'>{props.inputs.description}</ReactMarkdown>
                </div>
            </Box>
        </Modal>
    )
}
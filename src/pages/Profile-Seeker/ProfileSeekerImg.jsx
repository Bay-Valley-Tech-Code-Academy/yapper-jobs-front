import { useState, useRef } from "react";
import { Box, Image, Input } from "@chakra-ui/react";
import TestPic from "./yapper-jobs-defualt-seeker-img.jpg";
import useUserStore from "../../store/user-store";

function ProfileSeekerImg() {
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const { user, updateUser } = useUserStore();

    const handleImgClick = () => {
        inputRef.current.click();
    };

    const imgSelect = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setImage(file);
            } else {
                alert('Please select a valid image file');
            }
        }
    };

    return (
        <Box 
            onClick={handleImgClick} 
            cursor="pointer" 
            role="button" 
            aria-label="Upload Profile Picture"
            display="inline-block"
            textAlign="center"
            position="relative"
        >
            {image ? (
                <Image
                    className="seeker-img"
                    src={URL.createObjectURL(image)}
                    alt="Custom Profile Pic"
                    borderRadius="full"
                    boxSize="150px"
                    objectFit="cover"
                    border="5px solid purple"
                    _hover={{ borderColor: "gray"  }}
                />
            ) : (
                <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="150px"
                    border="5px solid purple"
                    objectFit="cover"
                    _hover={{ borderColor: "gray"}}
                />
            )}

            <Input
                type="file"
                ref={inputRef}
                onChange={imgSelect}
                display="none"
                aria-hidden="true"
            />
        </Box>
    );
}

export default ProfileSeekerImg;

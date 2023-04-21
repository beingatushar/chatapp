import React from 'react'
import { Avatar, HStack, Image, Text } from "@chakra-ui/react"
const Message = ({ text, user = 1, uri }) => {
    return (
        <HStack alignSelf={(user === 0) ? "end" : "start"}>
            {user === 1 ? <Avatar src={uri} /> : ""}
            <Text
                color={"black"}
                bgColor={user === 0 ? "blue.100" : "green.100"}
                p={2}
                borderRadius={"4"}
            >
                {text}
            </Text>
            {user === 0 ? <Avatar src={uri} /> : ""}
        </HStack>
    )
}
// user 0 -> self
// user 1 -> other
export default Message;

import React from 'react'
import styled from "styled-components";
import { BsArrowLeft } from 'react-icons/bs';

export default function Player() {
  return (
    <Container>
    <div className='player'>
        <div className="back">
        <BsArrowLeft />
        </div>
    </div>
    </Container>
  )
}

const Container = styled.div``;
import React from 'react'
import { useState } from "react";
import '../css/FormularAdaugareParticipant.css'
import { Button } from '@material-ui/core'

export default function Child2({ parentToChild2 }) {

    return (
        <div>
            {parentToChild2}
        </div>
    )
}
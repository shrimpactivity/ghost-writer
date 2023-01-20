import { useState, useEffect } from 'react';

const useComposition = () => {
    const [content, setContent] = useState([]);
    const [proposal, setProposal] = useState("");

    const addProposalAndSuggestion = (suggestion) => {
        const newContent = content.concat([proposal.trim(), suggestion]);
        setContent(newContent);
        setProposal("");
    }

    const getContentTokens = () => {

    }
    /**
 * useComposition:
 *  - content: string
 *  - proposal: string of user input to potentially be added
 *  - clearContent
 *  - updateContentAtIndex(i)
 *  - setProposal
 *  - addProposal: adds proposition to items
 *  - getContentTokens
 *  - getProposalTokens
 *  - getAllTokens
 */
}
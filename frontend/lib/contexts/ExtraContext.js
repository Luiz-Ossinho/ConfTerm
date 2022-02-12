import React from 'react';
import AnimalProductionsSideContent from '../../components/AnimalProductions/AnimalProductionsSideContent';

const ExtraContext = React.createContext(undefined);
const ExtraDispatchContext = React.createContext(undefined);

/**
 * 
 * @param {*} children Filhos que podem alterar ou ver algo referente ao conteudo no extra a direita
 * @returns O componente provider do Extra
 */
function ExtraProvider({ children }) {
    const [extra, setExtra] = React.useState(
        {
            visible: false,
            element: (<div>
                <AnimalProductionsSideContent />
            </div>)
        }
    );

    return (
        <ExtraContext.Provider value={extra}>
            <ExtraDispatchContext.Provider value={setExtra}>
                {children}
            </ExtraDispatchContext.Provider>
        </ExtraContext.Provider>
    );
}

export { ExtraProvider, ExtraContext, ExtraDispatchContext };
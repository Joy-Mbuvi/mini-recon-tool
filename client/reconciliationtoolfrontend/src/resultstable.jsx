import React from 'react'

function ResultsTable({results}) {

    function Category(title, data,keys){
        if (!data || Object.keys(data).length === 0)
            return null
        
        return(
            <div>
                <h3>{title}</h3>

                <table>
                    <thead>
                        <tr> 
                            {keys.map((key) => (
                            <th key={key}>{key}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data).map( ([ref,item])=>(
                            <tr key= {ref}>
                                <td>{ref}</td>
                                {keys.slice(1).map((key) => (
                               <td key={key}>{item[key] ?? ''}</td>
                                  ))}
                            </tr>
                            
                        )
                        )}
                    </tbody>
                </table>

            </div>
        )


    }

    return(
        <div>
            <Category
            Title= 'Matched'
            data= {results.matched}
            keys= {['Ref','Amount','Status','Timestamp']}

            />

            <Category
            Title='Mismatched'
            data={results.mismatches}
             keys= {['Ref','Amount','Status','Timestamp']}

            
            />

            <Category
            Title='Only in Provider'
            data={results.only_provider}
            keys= {['Ref','Amount','Status','Timestamp']}

            />

            <Category
            Title='Only in Transcation'
            data={results.only_transcation}
             keys= {['Ref','Amount','Status','Timestamp']}
            />


        </div>
    )
    
}



export default ResultsTable
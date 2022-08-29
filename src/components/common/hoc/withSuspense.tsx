import React, {Suspense} from 'react';

export function withSuspense(Component:React.ComponentType){
    return <Suspense fallback={<div>Загрузка...</div>}>
        <Component/>
    </Suspense>

}






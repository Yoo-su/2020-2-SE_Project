import React,{useState} from 'react';

function Cook(){
    return(
        <div>
          직원이 order페이지에서 주문하면 해당 주문이 여기에 등록되고
          요리사가 해당 주문에 대한 완료 버튼을 누르면<br></br>
          주문은 삭제되면서 동시에 order페이지의 해당 테이블에
          주문음식이 완료되었다는 표시가 뜸
        </div>
    );

}

export default Cook;
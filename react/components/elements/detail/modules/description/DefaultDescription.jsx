import React, { Component } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import PartialDescription from './PartialDescription';
import PartialReview from './PartialReview';

function DefaultDescription({ratingInfo,product}){

        return (
            <div>
                <div className="ps-product__content ps-tab-root">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Description" key="1">
                            <PartialDescription ratingInfo={ratingInfo} product={product}/>
                        </TabPane>
                        {ratingInfo&&<TabPane tab={"Reviews"+" "+"("+ratingInfo.length+")"} key="4">
                            <PartialReview ratingInfo={ratingInfo}/>
                        </TabPane>}
                    </Tabs>
                </div>
            </div>
        );
    
}

export default DefaultDescription;

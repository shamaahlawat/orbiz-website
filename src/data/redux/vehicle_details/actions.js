import actionTypes from '../action_types';

export function getVehicleDetails(model_id) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.VEHICLE_LOADING
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.VEHICLE_LOADED,
                payload: {
                    vehicle_details: {
                        _id: model_id,
                        name: "Tesla Model S",
                        images: {
                            white: {
                                front: "http://st.motortrend.com/uploads/sites/10/2015/11/2015-tesla-model-s-sedan-front-view.png",
                                rear: "http://st.motortrend.com/uploads/sites/10/2015/11/2015-tesla-model-s-sedan-rear-view.png"
                            },
                            black: {
                                front: "https://c-5uwzmx78pmca09x24kvmb2x2ekjaqabibqkx2ekwu.g00.cnet.com/g00/3_c-5eee.kvmb.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fkvmb2.kjaqabibqk.kwux2fquox2f0tG43L-67EIgkX8DoP-gzHHSfmYx3dx2f558f356x2f0893x2f85x2f00x2f0inn3l6k-n506-2j36-6j96-248i8lj4611nx2f0893BMA889i_9068_83.x78vox3fq98k.uizsx3dquiom_$/$/$/$/$/$/$/$/$",
                                rear: "https://c-5uwzmx78pmca09x24kvmb2x2ekjaqabibqkx2ekwu.g00.cnet.com/g00/3_c-5eee.kvmb.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fkvmb2.kjaqabibqk.kwux2fquox2fOTDu8vQj2QaAtz15YdqH49k9cIMx3dx2f558f356x2f0893x2f85x2f00x2f9j6857nm-87mi-2617-j19m-in4i4j795j75x2f0893BMA889i_9068_84.x78vox3fq98k.uizsx3dquiom_$/$/$/$/$/$/$/$/$"
                            }
                        }
                    }
                }
            });
        }, 3000);
    };
}

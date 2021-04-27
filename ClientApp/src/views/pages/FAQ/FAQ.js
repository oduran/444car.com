import React from "react";
import { get, post } from "../../../services/ApiServices";
import LoadingOverlay from "react-loading-overlay";
import { Layout } from '../../../components/Layout';
import { t } from "ttag";
import Faq from "react-faq-component";

import { saveLocale, getLocale } from '../../../Localization';


export default class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaderActive:true,
            sssquestions: [{
                title: "FAQ (How it works)",
                rows: [
                    {
                        title: "Lorem ipsum dolor sit amet,",
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
                    },
                    {
                        title: "Nunc maximus, magna at ultricies elementum",
                        content:
                            "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
                    },
                    {
                        title: "Curabitur laoreet, mauris vel blandit fringilla",
                        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
                    },
                    {
                        title: "What is the package version",
                        content: <p>current version is 1.2.1</p>,
                    }],
            }]
        }
    }
    async componentDidMount() {
        let language = getLocale();
        let languageNumber = 1;

        if (language.indexOf("en") > -1) {
            languageNumber = 1;
        }
        if (language.indexOf("ger") > -1) {
            languageNumber = 3;
        }
        let faqData = await get("/Faq/GetAllFaqByLanguage/" + languageNumber);
        let res = faqData.data.result;
        let arr = [];
        for (var i = 0; i < res.length; i++) {
            arr.push({ title: res[i].question, content: res[i].answer })
        }
        let data = { title: "FAQ", rows: arr }

        this.setState({ sssquestions: data });
        this.setState({ isLoaderActive: false })
    }
  render() {
    return (
     
            <Layout>

                <div className="wrapper">
                    <div>
                        <Faq
                            data={this.state.sssquestions}
                            styles={{
                                titleTextColor: "#0088cc",
                                rowTitleColor: "#1b6ec2"
                            }}
                        />
                    </div>
                </div>
            </Layout>
    );
  }
}

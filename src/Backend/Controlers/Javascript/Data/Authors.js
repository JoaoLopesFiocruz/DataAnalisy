import axios, {} from "axios";
import {} from 'express';
import handleError from "../Global/Method/error.js";
import 'express';
import { error } from "console";
class Author {
    static async MostImportants(size) {
        if (!size) {
            size = null;
        }
        return Author.api.get("", {
            params: {
                page: 0,
                size: size
            }
        }).then((response) => {
            const data = response.data._embedded.values.map((element) => {
                if (element.label) {
                    return {
                        label: element.label,
                        count: element.count
                    };
                }
            });
            return {
                Message: "query successfully",
                data: data,
                Status: 200,
                Sucess: true
            };
        }).catch((e) => {
            return handleError(e);
        });
    }
    static async MostImportantsRoute(req, res) {
        try {
            const { size } = req.body;
            if (!size) {
                return res.status(400).json({
                    Message: "Parameters null",
                    Status: 400,
                    Sucess: false
                });
            }
            const query = await Author.MostImportants(size);
            if (query.Sucess) {
                return res.status(200).json({
                    Message: "Query successfully",
                    data: query.data,
                    Status: 200,
                    Sucess: true
                });
            }
            else if (query.Status === 400) {
                return res.status(400).json({
                    Message: "Size is null",
                    Status: 400,
                    Sucess: false
                });
            }
            else {
                throw error;
            }
        }
        catch (e) {
            handleError(e);
            return res.status(500).json({
                Message: "Internal Error",
                Status: 500,
                Sucess: false
            });
        }
    }
    static async Nativepercent() {
        try {
            const AuthorsCount = await Author.MostImportants();
            const datareturned = { Native: 0, NotNative: 0 };
            const NativeAuthors = AuthorsCount.data?.map((element) => {
                if (element.label
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase()
                    .includes("INDIGENA") || element.label
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase()
                    .includes("INDIGENAS")) {
                    return element;
                }
                else {
                    return undefined;
                }
            }).filter((element) => element !== undefined);
            var SumNativeAuthors = 0;
            NativeAuthors?.forEach((element) => {
                SumNativeAuthors += element.count;
            });
            datareturned.Native = SumNativeAuthors;
            var SumAuthors = 0;
            AuthorsCount.data?.forEach((element) => {
                SumAuthors += element.count;
            });
            datareturned.NotNative = SumAuthors - SumNativeAuthors;
            return {
                Message: "Search successfully",
                data: datareturned,
                Status: 200,
                Sucess: true
            };
        }
        catch (e) {
            return {
                Message: "Internal error",
                Status: 501,
                Sucess: false
            };
        }
    }
    static async NativePercentRouter(req, res) {
        const query = await Author.Nativepercent();
        return res.status(200).json(query);
    }
}
Author.api = axios.create({
    baseURL: "https://api.treinamento.saudeindigena.icict.fiocruz.br/api/discover/facets/author"
});
export default Author;
//# sourceMappingURL=Authors.js.map
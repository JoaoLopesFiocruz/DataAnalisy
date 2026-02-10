import axios, {} from "axios";
import {} from 'express';
import handleError from "../Global/Method/error.js";
import 'express';
import { error } from "console";
class Author {
    static async MostImportants(size) {
        if (!size) {
            return {
                Message: "Size is null",
                Status: 400,
                Sucess: false
            };
        }
        return Author.api.get("", {
            params: {
                page: 0,
                size: size
            }
        }).then((response) => {
            const data = response.data._embedded.values.map((element) => {
                console.log(element.count);
                if (element.label) {
                    return {
                        label: element.label,
                        count: element.count
                    };
                }
            });
            console.log(data);
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
}
Author.api = axios.create({
    baseURL: "https://api.treinamento.saudeindigena.icict.fiocruz.br/api/discover/facets/author"
});
export default Author;
//# sourceMappingURL=Authors.js.map
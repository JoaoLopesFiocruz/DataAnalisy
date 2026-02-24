import axios, {} from "axios";
import 'express';
import {} from 'express';
class Book {
    static async YearCount() {
        return new Promise((resolve, reject) => {
            var result = {};
            Book.api.get("/objects?sort=score,DESC&page=0&query=dc.type%3A%22Book%22%20NOT%20%22Book%20Chapter%22&embed=thumbnail&embed=item%2Fthumbnail").then((response) => {
                response.data._embedded.searchResult._embedded.objects.map((i) => {
                    if (i._embedded) {
                        i._embedded.indexableObject.metadata["dc.type"].map((j) => {
                            if (j !== undefined && j.language && result[j.language]) {
                                //@ts-ignore
                                result[j.language] += 1;
                            }
                            else if (j && j.language && !result[j.language]) {
                                result[j.language] = 1;
                            }
                        });
                    }
                });
                resolve({
                    Message: "Query successfuly",
                    data: result,
                    Status: 200,
                    Sucess: false
                });
            }).catch(() => {
                resolve({
                    Message: "Internal Error",
                    Status: 501,
                    Sucess: false
                });
            });
        });
    }
    static async SubjectCountRoute(req, res) {
        const CountResponse = await Book.YearCount();
        return res.status(200).json(CountResponse);
    }
}
Book.api = axios.create({
    baseURL: "https://api.treinamento.saudeindigena.icict.fiocruz.br/api/discover/search"
});
export default Book;
//# sourceMappingURL=Data.js.map
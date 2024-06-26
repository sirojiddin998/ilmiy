import React from "react";

const OzbekTili = () => {
    return (
        <div className="container overflow-auto" style={{ marginTop: "200px" }}>
            <h3 className="text-center mb-5">O'zbek tili</h3>
            <table className=" table-bordered">
                <thead>
                    <tr className="text-center">
                        <th scope="col">Ilmiy kengash shifri va nomi</th>
                        <th scope="col">Ilmiy kengash (qayta) ochilgan sanasi, OАK buyrugʼining №</th>
                        <th scope="col">Ilmiy darajalar beriladigan fan sohasi, ixtisosliklar shifri va nomi</th>
                        <th scope="col">Kengash raisining F.I.Sh., ilmiy darajasi va unvoni, ish joyi, lavozimi, tel.</th>
                        <th scope="col">Ilmiy Kengash kotibi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td>Аndijon davlat universiteti xuzuridagi filologiya fanlari boʼyicha ilmiy darajalar beruvchi DSc.03/05.05.2023.Fil.60.02 raqamli ilmiy kengash</td>
                        <td>2023 й. 5-may 337/2-son</td>
                        <td>10.00.01-Oʼzbek tili</td>
                        <td>Sobirov Аbdulxay Shukurovich, filologiya fanlari doktori, professor, +998914789801</td>
                        <td>Usmanov Farxad Faxriddinovich +99893-419-35-29</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OzbekTili
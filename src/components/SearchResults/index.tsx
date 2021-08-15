import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharactersList } from "../CharactersList";
import { Pagination } from "../Pagination";
import { getCharacters } from "../../api";
import { DataConsumer, EDataStatus } from "../DataConsumer";
import { ICharacter } from "../../Utils/types";

interface IParams {
  searchQuery: string;
  currentPage: string;
}

interface ISearchResultsProps {
  path: string;
  detailsPath: string;
}

export const SearchResults: React.FC<ISearchResultsProps> = ({
  path,
  detailsPath,
}) => {
  const characterPerPage = 4;
  const { searchQuery, currentPage } = useParams<IParams>();
  const [dataProvider, setDataProvider] = useState<{
    dataStatus: EDataStatus;
    data: { total: number; values: ICharacter[] };
  }>({
    dataStatus: EDataStatus.loading,
    data: { total: 0, values: [] },
  });

  useEffect(() => {
    //loadCharacters
    (async () => {
      try {
        const results = await getCharacters({
          nameStartsWith: searchQuery.trim(),
          orderBy: "name",
          offset: (+currentPage - 1) * characterPerPage,
          limit: characterPerPage,
        });
        const dataStatus =
          results.values.length > 0 ? EDataStatus.success : EDataStatus.failure;

        setDataProvider({ dataStatus: dataStatus, data: results });
      } catch {
        setDataProvider({ ...dataProvider, dataStatus: EDataStatus.error });
      }
    })();
    // eslint-disable-next-line
  }, [searchQuery, currentPage]);

  const successJSX = () => (
    <section className="lumx-spacing-padding-horizontal-huge">
      <CharactersList
        characters={dataProvider.data.values}
        detailsPath={detailsPath}
      />
      <Pagination
        itemPerPage={characterPerPage}
        itemNumber={dataProvider.data.total}
        path={`${path}/${searchQuery}`}
        activePage={+currentPage}
      />
    </section>
  );

  return (
    <DataConsumer
      successJSX={successJSX}
      dataStatus={dataProvider.dataStatus}
    />
  );
};

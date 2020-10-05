import React from 'react';
import styles, { muiStyles } from '$root/components/games/game/file-data/styles';
import { withStyles } from '@material-ui/styles';

import DataDescription from '$root/components/games/game/data-description/component';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function FileData(props) {
  const { classes } = props;

  return (
    <div className="container-table-file-data">
      <DataDescription description="FILE" imgFilename="/images/icons/data-file.png" />
      <Paper classes={{ root: classes.paper }}>
        <Table>
          <TableHead classes={{ root: classes.tableHead }}>
            <TableRow classes={{ root: classes.tableHeadRow }}>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Filename
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Size
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Upload date
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Uploader
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Download
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody classes={{ root: classes.tableBody }}>
            <TableRow classes={{ root: classes.tableBodyRow }}>
              <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                {props.data.filenamePlayer}
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                {props.data.size}
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                {props.preview === false ? (
                  <div>
                    <div style={{ marginBottom: '10px' }}>
                      {props.data.uploadDate.uploadDateUTC}
                      <br />
                      {props.data.uploadDate.uploadTimeUTC}
                    </div>
                    <div>
                      {props.data.uploadDate.uploadDateLocal}
                      <br />
                      {props.data.uploadDate.uploadTimeLocal}
                    </div>
                  </div>
                ) : (
                  '?'
                )}
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                {props.preview === false ? props.data.uploaderPlayer : '?'}
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                {props.preview === false ? (
                  <a href={`/downloads/${props.data.filenameSystem}`} download={props.data.filenamePlayer}>
                    <img src={'/images/icons/download.png'} />
                  </a>
                ) : (
                  '?'
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <style jsx>{styles}</style>
    </div>
  );
}
export default withStyles(muiStyles)(FileData);
